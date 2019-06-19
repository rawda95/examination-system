import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthData} from './auth.data.model'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({providedIn: 'root'})


export class AuthService{

private isAuthenticated =false;
private tokenTimer: NodeJS.Timer;   
private token: string;
private authStatusListener =new  Subject<boolean>();
constructor(private httpClient: HttpClient,private router: Router) {}

getToken() {
return;
}
getIsAuth() {
  return this.isAuthenticated;
}
getAuthStatuseListener() {
  return this.authStatusListener.asObservable();
}
  createUser(email: string, password: string) {
        const authData: AuthData = {email, password};
        this.httpClient.post('http://localhost:3000/api/user/signUp', authData)
        .subscribe(response => {
            console.log(response);
        });
        this.router.navigate(['/']);

  }
  login(email: string, password: string) {
      const authData: AuthData = {email, password};
      this.httpClient.post<{token: string, expiresIn: number,role:string}>('http://localhost:3000/api/user/login', authData)
      .subscribe((response) => {
       const token = response.token;
       this.token = token;
       if (token) {

        const expiresDuration = response.expiresIn;
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, expiresDuration * 1000);
        console.log(expiresDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        localStorage.setItem('currentUserToken',this.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/']);
       }

       return null ; 

      }, (error) =>
      {
        return error.error.message.message;
      }
      );


  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }
}
