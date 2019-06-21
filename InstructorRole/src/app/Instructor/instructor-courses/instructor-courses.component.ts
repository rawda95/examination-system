import { Component, OnInit } from '@angular/core';
import { course } from '../../courses/course';

import { InstructorCoursesService } from './instructor-courses.service';
 
@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.scss']
})
export class InstructorCoursesComponent implements OnInit {

  constructor( private instructorCoursesService: InstructorCoursesService) { }

  Courses: course[];

  ngOnInit() {
    this.getStdCourses();
  }


  getStdCourses() {
    this.instructorCoursesService.getInstCourses().subscribe(
      result => {
        console.log(result);
        this.Courses = result.courses;
        console.log(this.Courses);


      }
    );
  }

}
