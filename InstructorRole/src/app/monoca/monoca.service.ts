import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MonocaService {
  url:string = "http://localhost:3000/code/";

  constructor(private http: HttpClient) { }
  data;

  runCode(code, lang){
    console.log("Run Code");
    this.data={'code':code,
    'lang':lang};
    return this.http.post(this.url+"code", this.data)
   }// RunCode
 
}
