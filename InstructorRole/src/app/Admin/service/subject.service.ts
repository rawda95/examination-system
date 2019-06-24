import { Injectable } from '@angular/core';
import {subjectModel} from '../Model/subjectModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {


  constructor(private http: HttpClient) { }






  baseurl = 'http://localhost:3000/subject';

  getAll() {
    console.log(' begin get ');
    return this.http.get<subjectModel[]>(this.baseurl + '/list') ;

  }
  getSub(id: String) {
     console.log('qwer');
     return this.http.get<subjectModel>(this.baseurl + '/getbyid/' + id);
  }
  addSubject(sub: subjectModel) {
    return this.http.post<subjectModel>(this.baseurl + '/add', sub);
  }
  deleteSubject(id: number) {
    console.log('sjkhdjd');
    return this.http.get<subjectModel>(this.baseurl + '/delete/' + id);
  }
  editSubject(id: number, sub: subjectModel) {
    console.log('start edit');
    return this.http.put<subjectModel>(this.baseurl + '/edit/' + id, sub);
  }

  getsubsrelated(id: number) {
    return this.http.get<subjectModel[]>(this.baseurl + '/getsubs/' + id);
  }

}
