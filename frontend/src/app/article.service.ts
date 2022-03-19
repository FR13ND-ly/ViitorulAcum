import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = config.apiUrl

  getAuthorization(code : any) {
    return this.http.get(`${this.APIUrl}getAuthorization/${code}`)
  }

  addArticle(article: any) {
    return this.http.post(this.APIUrl + 'addArticle/', article)
  }

  editArticle(article: any) {
    return this.http.post(this.APIUrl + 'editArticle/', article)
  }

  deleteArticle(id : any) {
    return this.http.get(`${this.APIUrl}deleteArticle/${id}`)
  }

  getArticle(id : any) {
    return this.http.get(`${this.APIUrl}getArticle/${id}`)
  }

  getArticlesList(articleId : any = 0) {
    return this.http.get(`${this.APIUrl}getArticlesList/${articleId}`)
  }
}
