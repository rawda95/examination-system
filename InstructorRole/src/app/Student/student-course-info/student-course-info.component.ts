import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-student-course-info',
  templateUrl: './student-course-info.component.html',
  styleUrls: ['./student-course-info.component.scss']
})
export class StudentCourseInfoComponent implements OnInit {

  constructor(public route: ActivatedRoute) { }

  id;
  ngOnInit() {

this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('id')) {
      this.id = paramMap.get('id');
    }
    });

  }
}

