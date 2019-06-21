import { Exam } from '../../Exam/exam';
import { Component, OnInit } from '@angular/core';
import { StudetnAvailableExamService } from './studetn-available-exam.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-available-exam',
  templateUrl: './student-available-exam.component.html',
  styleUrls: ['./student-available-exam.component.css']
})
export class StudentAvailableExamComponent implements OnInit {
  constructor( private studetnAvailableExamService: StudetnAvailableExamService ,private router: Router) { }
studentAvalibleExams: Exam[];
  ngOnInit() {
    this.getExams();
  }

  getExams() {
    this.studetnAvailableExamService.getStdAvalibleExams().subscribe(
      result => {
        this.studentAvalibleExams = result.exams;
        console.log(`result : ${result.exams}`);
        console.log(this.studentAvalibleExams);
      }
    )
  }


  startExam(exam_id){

    this.router.navigate([`/exam/${exam_id}`]);


  }

}
