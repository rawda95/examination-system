import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentCoursesService {


  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000/student/courses';

  getStdCourses(id): Observable <{courses}>
  {
    return this.http.get<{courses}>(this.url + `/${id}`);
  }
}
