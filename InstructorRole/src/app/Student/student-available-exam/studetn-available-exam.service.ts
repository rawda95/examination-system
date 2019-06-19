import { Exam } from '../../Exam/exam';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudetnAvailableExamService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000/exam/avalible';

  getStdAvalibleExams(id): Observable<{exams}>
  {
    return this.http.get<{exams}>(this.url + `/${id}`);
  }
}
