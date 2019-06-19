import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {LoginComponent} from './login.component';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

public isAuthenticated = false;
public tokenTimer: NodeJS.Timer;
public token: string; public error: string ;
public authStatusListener = new  Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }
  url = 'http://localhost:3000/';

  login(user) {
    return this.http.post<{token: string, role: string}>(this.url + 'login', user);
    // .subscribe((response) => {
    //   this.error = null;
    //   this.token = response.token;
    //   // this.token = token;
    //   if (this.token) {

    //   //  const expiresDuration = response.expiresIn;
    //    this.tokenTimer = setTimeout(() => {
    //      this.logout();
    //    }, 40000000);
    //    this.isAuthenticated = true;
    //    this.authStatusListener.next(true);
    //    localStorage.setItem('currentUserToken', this.token);
    //    localStorage.setItem('role', response.role);
    //    if (response.role === 'Admin') {
    //     this.router.navigate(['/']);
    //    }
    //   }

    //  }, (error) => {
    //   // LoginComponent.setError(error.error.message.message);
    //   this.error =  error.error.message.message;
    //   // console.log(this.error);
    //  }
    //  );


  }


  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatuseListener() {
    return this.authStatusListener.asObservable();
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
    localStorage.removeItem('role');
  }
}
