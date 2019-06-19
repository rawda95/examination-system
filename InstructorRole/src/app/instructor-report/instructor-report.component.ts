import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { QuestionsService } from '../Questions/question.service';

@Component({
  selector: 'app-instructor-report',
  templateUrl: './instructor-report.component.html',
  styleUrls: ['./instructor-report.component.scss']
})
export class InstructorReportComponent implements OnInit {
  name = 'Angular 5';
  options={
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    };
    constructor(   ) {}

  ngOnInit() {
  }
  
displayedColumns = ['id', 'std.name', 'grade', 'ins.name'];

}
 