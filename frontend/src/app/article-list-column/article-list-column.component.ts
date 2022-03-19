import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-list-column',
  templateUrl: './article-list-column.component.html',
  styleUrls: ['./article-list-column.component.scss']
})
export class ArticleListColumnComponent implements OnInit {

  constructor(private articleService : ArticleService) { }
  @Input() articleId : any
  articles: any = [] 
  
  ngOnInit(): void {
    this.articleService.getArticlesList(this.articleId).subscribe(articles => this.articles = articles)
  }

}
