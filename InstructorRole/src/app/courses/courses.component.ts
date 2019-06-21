import { Component, OnInit } from '@angular/core';
import './../../assets/js/jquery-3.2.1.min.js';
import './../../assets/vendors/nice-select/js/jquery.nice-select.min.js';
import './../../assets/vendors/owl-carousel/owl.carousel.min.js';
import './../../assets/js/owl-carousel-thumb.min.js';
import './../../assets/js/jquery.ajaxchimp.min.js';
import './../../assets/js/mail-script.js';
import './../../assets/js/gmaps.min.js';
import './../../assets/js/theme.js';
import { course } from './course';

import { StudentCoursesService } from '../Student/student-courses/student-courses.service.js';
 
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  // Courses = [
  //   {
  //     Name: 'C#',
  //     description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //     InstructorName:"Mohamed Elsafie"
  //   },
  //   {
  //    Name: 'C#',
  //   description: 'Some quick example text to build on the card title and make up the bulk of the card content',
  //   InstructorName:"Mohamed Elsafie"
  //   },
    
  //   {
  //     Name: 'C#',
  //     description: 'Some quick example text',
  //     InstructorName:"Mohamed Elsafie"
  //   } ,
  //   {
  //     Name: 'C#',
  //     description: 'Some quick example text',
  //     InstructorName:"Mohamed Elsafie"
  //   } 
    
  // ];
  
  constructor(private studentCoursesService: StudentCoursesService) { }

  Courses: course[];
  ngOnInit() {
    this.getStdCourses();
  }

  getStdCourses() {
    this.studentCoursesService.getStdCourses().subscribe(
      result => {
        console.log(`coursess ${result}`);
        this.Courses = result.courses;
        console.log(this.Courses);


      }
    );
  }
}
