import { Component, OnInit } from '@angular/core';
import {TeacherModel} from '../Model/TeacherModel';

import {TeacherService} from '../service/teacher.service';
import {subjectModel} from '../Model/subjectModel';

import {SubjectService} from '../service/subject.service';


@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent implements OnInit {

  constructor(){}
  ngOnInit(){}
//   id: number;
//   x: number;

//   availableteachers: TeacherModel;
//   teatchercurrrentsubject: subjectModel = new subjectModel(null, null, null);
//   teachersub: String;
//   newteacher: TeacherModel = new TeacherModel(null , null , null);
//   availablesubbjects: subjectModel[] = [];


// saveeditedteacher() {
//   console.log( 'mynew teacher'+ this.newteacher);
//   console.log( 'mynew teacher name'+ this.newteacher.name);
//   console.log( 'mynew teacher sub '+ this.newteacher.Sub);
//   this.teachersrvs.saveeditteacher(this.id, this.newteacher).subscribe(a => this.availableteachers = a);

// }



//   constructor( private teachersrvs: TeacherService , private subsrvs: SubjectService, private route: ActivatedRoute ) { }

//   ngOnInit() {
//   this.subsrvs.getAll().subscribe(
//     a => {

//       this.availablesubbjects = a;
//     },
//     (e) => console.log('Errrror')
//     );

//   this.route.params.forEach(element => {
//       this. x = element.id;
//       console.log(this.id);
//     });
//   this.id = this.x;

//     // console.log( "hyghgdsy"+this.x);
//     // console.log(this.id);

//   this.teachersrvs.editteacher(this.id).subscribe(a => {
//      console.log('heyyyy'+ a) ;
//      console.log(a.name);
//      console.log(a.Sub);


//      this.availableteachers = a;
//      console.log(this.availableteachers);
//      this.newteacher.name = this.availableteachers.name;
//      this.subsrvs.getSub(a.Sub).subscribe(asub =>
//       {
//         console.log('sssss', asub) ;
//         this.teatchercurrrentsubject = asub;
//         this.teachersub = this.teatchercurrrentsubject.name;

//       }
//       );// Subject

//   },
//   e => {console.log('llllllllll ', e);}

//   ); // Teacher




//   }

}
