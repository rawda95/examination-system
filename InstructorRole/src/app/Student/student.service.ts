import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from './student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000/student';


  getstd(id): Observable<{student}>
  {
    return this.http.get<{student}>(this.url + `/${id}`);

  }
}
