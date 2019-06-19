import { course } from '../../courses/course';
import { Component, OnInit } from '@angular/core';
import { StudentCoursesService } from './student-courses.service';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  constructor(private studentCoursesService: StudentCoursesService) { }

  courses: course[];
  ngOnInit() {
    this.getStdCourses();
  }

  getStdCourses() {
    this.studentCoursesService.getStdCourses(25).subscribe(
      result => {
        console.log(`coursess ${result}`);
        this.courses = result.courses;
        console.log(this.courses);


      }
    );
  }

}

