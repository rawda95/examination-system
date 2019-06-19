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

   getExam(examId: string): Observable <{_id , questions, message}> {

    return this.http.post<{_id , questions , message}>(this.baseUrl + `/25`, {examId});
   }

   answerExam(examQId: string, AnswerList) : Observable <{ message}> {
     return this.http.post<{ message}> (this.baseUrl + `/answer/25`, {examQId, AnswerList} );
   }
}
