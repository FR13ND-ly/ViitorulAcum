import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = config.apiUrl

  getLikes(info: any) {
    return this.http.post(this.APIUrl + 'getLikes/', info)
  }

  addLike(info: any) {
    return this.http.post(this.APIUrl + 'addLike/', info)
  }
}
