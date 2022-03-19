import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from '../article.service';
import { LikeService } from '../like.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  constructor(private articleService: ArticleService, private domSanitizer: DomSanitizer, private likeService : LikeService, private userService : UserService, public sanitizer: DomSanitizer, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  isDarkTheme: boolean = false
  article : any = {
    id : 0,
    title : "",
    imageUrl: "",
    text : "",
    liked : false,
    likesCount : 0,
    comments : []
  }

  share : boolean = false
  loading : boolean = true
  user : any
  private userSub: Subscription | undefined;
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.isDarkTheme = localStorage.getItem('isDarkTheme') == "dark-theme"
    this.onChangeTheme()
    this.route.params.subscribe(params => {
      this.article.id = params['id']
      this.articleService.getArticle(this.article.id).subscribe(article => {
        this.article = article;
        this.article.text = this.domSanitizer.bypassSecurityTrustHtml(this.article.text) 
        this.loading = false
      })
    })
    this.userService.getUser()
    this.userSub = this.userService.getUserUpdateListener()
      .subscribe((user: any) => {
        this.user = user
        this.getLikesInfo()
      })
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe()
  }

  getLikesInfo() {
    this.likeService.getLikes({
      articleId : this.article.id,
      token : this.user ? this.user.uid : ""
    }).subscribe((res : any) => {
      this.article.likesCount = res.likesCount
      this.article.liked = res.liked
    })
  }

  onChangeTheme(){
    let theme = this.isDarkTheme ? "dark-theme" : "light-theme"
    document.body.className = "mat-typography " + theme
    localStorage.setItem('isDarkTheme', this.isDarkTheme ? "dark-theme" : "light-theme")
    this.isDarkTheme = !this.isDarkTheme
  }

  onLikeArticle() {
    if (this.user) {
      this.likeService.addLike({
        articleId : this.article.id,
        token : this.user.uid
      }).subscribe(res => this.getLikesInfo())
    }
    else {
      let snackbar = this._snackBar.open("Trebuie să te loghezi", "Logare", {duration: 3000});
      snackbar.onAction().subscribe(() => {
        this.userService.login();
      });
    }
  }

  onLogin() {
    this.userService.login()
  }

  onLogout() {
    this.userService.logout()
  }

  onShare(e : any, link : string) {
    e.preventDefault();
    var windowShare : any = window.open(
      link + location.href,
      'facebook-popup',
      'height=350,width=600'
    );
    if (windowShare.focus) {
      windowShare.focus();
    }
  }
}
