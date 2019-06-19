import { Component, OnInit } from '@angular/core';
import {ExamService} from './exam.service';
import {Question} from './question';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css',
    '../../assets/vendor/bootstrap/css/bootstrap.min.css',
    '../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../assets/fonts/Linearicons-Free-v1.0.0/icon-font.min.css',
    '../../assets/vendor/animate/animate.css',
    '../../assets/vendor/css-hamburgers/hamburgers.min.css',
    '../../assets/vendor/animsition/css/animsition.min.css',
    '../../assets/vendor/select2/select2.min.css',
    '../../assets/vendor/daterangepicker/daterangepicker.css',
    '../../assets/css/util.css',
    '../../assets/css/main.css',
]})
export class ExamComponent implements OnInit {

  constructor(private examService: ExamService, private router: ActivatedRoute) {
   }
  curentAnswer = '';
  main_exam_id ;
  questions: Question [] ;
  curentQuestionId = 0;
  answers = [];
  obj ;
  examId ;
  error;
  getExam(): void {
    // /5cfb9084dc4d755c73341c0b
    this.examService.getExam(this.main_exam_id).subscribe(
       (result) => {
         console.log(`examq id ${result._id}`);
         this.examId = result._id;
         this.questions = result.questions;
         console.log(this.questions);
        },

         (error) => {
          // error = JSON.stringify(error);
          this.error = error.error.message.message;
          console.log(this.error); }
          // this.router.navigate(['search']);

    );

  }



  onItemChange(event) {
    console.log(`event target ${event.target.value}`);
    this.curentAnswer = event.target.value ;
    console.log(`curent answer  ${this.curentAnswer}`);
  }

next() {
  if (this.answers.find(o => o.question === this.questions[this.curentQuestionId]._id)) {
    this.answers[this.curentQuestionId].answer = this.curentAnswer;

  } else {
 this.obj = {
  question : this.questions[this.curentQuestionId]._id,
  answer  : this.curentAnswer

};

 this.answers.push(this.obj);
  }
  console.log(`student answers : ${this.answers}`);

  this.answers.forEach(answer => {
  console.log(`q1 ${answer.question} : answer : ${answer.answer}`);
});
  console.log(this.curentAnswer);

  if (this.curentQuestionId === this.questions.length - 1) {
    // make submet
    this.examService.answerExam(this.examId, this.answers).subscribe(result => {
      if (result.message === 'saved ') {
        // this.router.navigate(['student/home']);

      }
    });
    console.log('done');
    // this.route
  } else {
    this.curentQuestionId += 1;
  }
}

pref() {
  if (this.curentQuestionId > 0) {

  this.curentQuestionId -= 1;
  }
}

  ngOnInit() {


  console.log(this.questions);

  this.main_exam_id = this.router.snapshot.paramMap.get( 'main_exam_id');
  this.router.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('main_exam_id')) {

      console.log(`main_exam_id ${this.main_exam_id}`);
      this.main_exam_id = paramMap.get('main_exam_id');
    } else {
      // error page
      console.log('error page ');
        }
   });                                                                                                                                                    
  this.getExam();




  }

}
