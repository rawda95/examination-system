import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
// import { AuthService } from '../auth.service';
import {LoginService} from './login.service';
import { Router } from '@angular/router';

//  import {} from './../../../assets/fonts/material-icon/css/'

@Component({
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css',
'./../../../assets/fonts/material-icon/css/material-design-iconic-font.min.css']


})
export class LoginComponent {
    isLoading = false;
    userName = '';
    password = '';
    error;
    constructor(private loginservice: LoginService, private router: Router) {}
    onLogin(form: NgForm) {

        console.log('in login');
        if (form.invalid) {
            return;
        }
        this.isLoading = true;
        this.loginservice.login(form.value).subscribe((response) => {
            // this.error = null;
            this.loginservice.token = response.token;
            // this.token = token;
            if (this.loginservice.token) {

        //  const expiresDuration = response.expiresIn;
             this.loginservice.tokenTimer = setTimeout(() => {
               this.loginservice.logout();
             }, 40000000);
             this.loginservice.isAuthenticated = true;
             this.loginservice.authStatusListener.next(true);
             localStorage.setItem('currentUserToken', this.loginservice.token);
             localStorage.setItem('role', response.role);
             if (response.role === 'Admin') {
              this.router.navigate(['/']);
             } else if (response.role === 'Student') {
                console.log('in student role');
                this.router.navigate(['/student/exams']);

             }
            }
           }, (error) => {
            // LoginComponent.setError(error.error.message.message);
            this.error =  error.error.message.message;
            //  console.log(this.error);
           }
           );





        // console.log(this.loginservice.error);
        // if(this.loginservice.error){
        // this.error = this.loginservice.error ;
        // }
    }



}
