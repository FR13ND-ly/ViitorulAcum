import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CommentService } from '../comment.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {

  @Input() articleId : any
  
  user : any
  comments : any = []

  userSub : Subscription | undefined
  constructor(private userService : UserService, private commentService : CommentService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUser()
    this.userSub = this.userService.getUserUpdateListener()
      .subscribe((user: any) => {
        this.user = user
      })
    this.onGetComments()
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe()
  }

  onGetComments() {
    this.commentService.getComments(this.articleId).subscribe(comments => this.comments = comments)
  }

  onAddComment(form : any) {
    if (form.value.text && form.value.text.trim()) {
      this.commentService.addComment({
        articleId : this.articleId,
        username : this.user.displayName,
        imageURL : this.user.photoURL,
        text : form.value.text
      }).subscribe(res => {
        if (res == "406") {
          this._snackBar.open("Comentariul vostru conține cuvinte interzise", "", {duration: 3000});
        }
        else {
          this.comments = res
        }
        form.reset()
      })
    }
  }

  onLogin() {
    this.userService.login()
  }

}
