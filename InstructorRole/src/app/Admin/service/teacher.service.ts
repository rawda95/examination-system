import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TeacherModel} from '../Model/TeacherModel';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }




  baseurl= 'http://localhost:3000/teacher';

  getAll() {
    console.log(' begin get ');
    return this.http.get<TeacherModel[]>(this.baseurl + "/list") ;
  }
  // getteacher(id:number){
  //    console.log("qwer");
  //   return this.http.get<TeacherModel>(this.baseurl+"/getbyid/"+id);
  // }
  addteacher(tea: TeacherModel) {
    return this.http.post<TeacherModel>(this.baseurl + "/add", tea);
  }
  deleteteacher(id: number) {
    console.log('sjkhdjd');
    return this.http.get<TeacherModel>(this.baseurl + "/delete/" + id);
  }

  editteacher(id: number) {
    console.log('start edit');
    console.log('iffffff: ', id);


    // this.http.get<TeacherModel>(this.baseurl+"/edit/"+id).subscribe(a=> {

    return this.http.get<TeacherModel>(this.baseurl + "/edit/" + id);
  }






  saveeditteacher(id: number, tea: TeacherModel) {
    console.log('start edit');
    return this.http.post<TeacherModel>(this.baseurl + "/edit/" + id , tea);
  }

  gettecherrelated(id: Number) {
   return this.http.get<TeacherModel[]>(this.baseurl + "/getteacherrel/" + id);
   }

}
