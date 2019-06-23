import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Email} from './email.model';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  private emails: Email[] = [];
  constructor(private HttpClient: HttpClient, private router: Router) { }

addEmail(name: string, email: string, subject: string, message: string) {
  const sendEmail = new FormData();
  sendEmail.append('name', name);
  sendEmail.append('email', email);
  sendEmail.append('subject', subject);
  sendEmail.append('message', message);
  console.log(message);


  this.HttpClient.post('http://localhost:3000/sendmail', sendEmail)
  .subscribe(responseData => {
    if(responseData)
    {
      console.log('in response function');
      // this.router.navigate(['/']);
    }});

}

}
