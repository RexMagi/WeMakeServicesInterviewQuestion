import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { BehaviorSubject, of, from, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo: BehaviorSubject<auth.UserCredential>;

  constructor(public afAuth: AngularFireAuth) {
    this.userInfo = new BehaviorSubject(null);
  }

  sigin(): Observable<boolean> {
    const provider = new auth.GithubAuthProvider();
    provider.addScope('repo');
    return from(this.afAuth.auth.signInWithPopup(provider)).pipe(tap(val => {
      this.userInfo.next(val);
    }), map(val => val !== null));
  }

  isAuthenticated(): Observable<boolean> {
    return this.userInfo.pipe(map(user => user !== null));
  }

  getToken(): Observable<string> {
    return this.userInfo.pipe(map(user => (<any>user.credential).accessToken));
  }

  getUserName(): Observable<string> {
    console.log(this.userInfo.value.user.photoURL);
    return this.userInfo.pipe(map(user => (user.additionalUserInfo.username)));
  }

  getPhoto(): Observable<string> {
    return this.userInfo.pipe(map(user => (user.user.photoURL)));
  }

  getName(): Observable<string> {
    return this.userInfo.pipe(map(user => (user.user.displayName)));
  }
}
