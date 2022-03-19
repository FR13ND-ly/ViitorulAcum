import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  constructor(private articleService : ArticleService, private scrollDispatcher: ScrollDispatcher) { }

  allArticles: any = [] 
  articles : any = []
  tags: string[] = ["economic", "medicină", "educație", "social media", "știință", "tehnologii", "artă", "industria jocurilor"]
  selected : string[] = []
  loading : boolean = true

  ngOnInit(): void {
    this.articleService.getArticlesList().subscribe(articles => {
      this.allArticles = articles 
      this.selectArticles()
      this.loading = false
    })
  }

  onToggleTag(tag : string) {
    if (this.selected.includes(tag)) this.selected.splice(this.selected.indexOf(tag), 1)
    else this.selected.push(tag)
    this.selectArticles()
  }

  selectArticles() {
    if (this.selected.length) {
      this.articles = []
      this.allArticles.forEach((article : any) => {
        if (this.selected.includes(article.tag))
          this.articles.push(article)
      });
    }
    else {
      this.articles = [...this.allArticles]
    }
  }

}
