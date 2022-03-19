import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config } from './config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = config.apiUrl

  user : any = false
  private userUpdated = new Subject<any[]>() 

  getUserUpdateListener() {
    return this.userUpdated.asObservable()
  }

  getUser() {
     getAuth().onAuthStateChanged((user : any)=> {
      this.userUpdated.next(user)
    })
  }

  async login() {
    const auth = getAuth();
    let userData : any = await signInWithPopup(auth, new GoogleAuthProvider)
    let data = {
      image : userData.user.photoURL,
      username : userData.user.displayName,
      token : userData.user.uid
    }
    await this.http.post(this.APIUrl + 'login/', data).toPromise()
  }

  logout() {
    getAuth().signOut()
    this.user = null
    this.userUpdated.next(this.user)
  }
}
