import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  constructor(private router : Router, private route : ActivatedRoute, private articleService : ArticleService, private _snackBar: MatSnackBar) { }
  article : any = {
    title : '',
    subtitle : '',
    text : '',
    tag : ''
  }
  isDarkTheme: boolean = false
  verified: boolean = false
  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('isDarkTheme') == "dark-theme"
    this.onChangeTheme()
    this.route.params.subscribe(params => {
      this.article.id = params['id'];
      if (this.article.id) {
        this.articleService.getArticle(this.article.id).subscribe(article => {
          this.article = article
          if (this.article == "404") this.router.navigate(['/'])
        })
      }
    })
     this.articleService.getAuthorization(prompt("Codul de verificare:")).subscribe(res => {
      if (res) this.router.navigate(['/'])
      else this.verified = true
     })
  }

  onChangeTheme(){
    let theme = this.isDarkTheme ? "dark-theme" : "light-theme"
    document.body.className = "mat-typography " + theme
    localStorage.setItem('isDarkTheme', this.isDarkTheme ? "dark-theme" : "light-theme")
    this.isDarkTheme = !this.isDarkTheme
  }

  onAddArticle() {
    if (!this.article.title.trim()) {
      this._snackBar.open("Nu ați completat titlul");
      return
    }
    if (!this.article.tag.length) {
      this._snackBar.open("Nu ați completat tag-ul", "", {duration: 3000});
      return
    }
    if (!this.article.text.trim()) {
      this._snackBar.open("Nu ați completat textul", "", {duration: 3000});
      return
    }
    if (this.article.id) this.articleService.editArticle(this.article).subscribe(res => this.router.navigate(['articol', this.article.id]))
    else this.articleService.addArticle(this.article).subscribe(id => this.router.navigate(['articol', id]))
  }

  onDeleteArticle() {
    if (confirm(`Ești sigur că dorești să ștergi articolul „${this.article.title}”?`))
      this.articleService.deleteArticle(this.article.id).subscribe(res => this.router.navigate(['/']))
  }

}
