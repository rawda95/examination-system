import { Injectable } from '@angular/core';
import {Question} from './question';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExamService {

  baseUrl = 'http://localhost:3000/student/exam';
  constructor(private http: HttpClient) { }

   getExam(examId: string): Observable <{q, message, time }> {

    return this.http.post<{q,message,time }>(this.baseUrl + `?token=` + localStorage.getItem('currentUserToken'), {examId});
   }

   answerExam(examQId: string, AnswerList) : Observable <{ message}> {
     // tslint:disable-next-line:max-line-length
     return this.http.post<{ message}> (this.baseUrl + `/answer?token=` + localStorage.getItem('currentUserToken'), {examQId, AnswerList} );
   }
}
