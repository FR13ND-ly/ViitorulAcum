import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = config.apiUrl

  getComments(id : any) {
    return this.http.get(`${this.APIUrl}getComments/${id}`)
  }

  addComment(info: any) {
    return this.http.post(this.APIUrl + 'addComment/', info)
  }
}
