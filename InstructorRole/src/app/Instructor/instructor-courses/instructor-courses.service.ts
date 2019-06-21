import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InstructorCoursesService {

  constructor(private http: HttpClient) { }


  url = 'http://localhost:3000/teacher/courses';

  getInstCourses(): Observable <{courses}>
  {
    return this.http.get<{courses}>(this.url + `/?token=` + localStorage.getItem('currentUserToken'));
  }
}
