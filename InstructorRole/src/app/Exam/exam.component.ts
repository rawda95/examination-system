import { Component, OnInit } from '@angular/core';
import {ExamService} from './exam.service';
import {Question} from './question';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { timer } from 'rxjs';

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

  constructor(private examService: ExamService, private router: ActivatedRoute ) {
   }
  curentAnswer = '';
  main_exam_id ;
  questions: Question [] ;
  curentQuestionId = 0;
  answers = [];
  obj;
  examId ;
  error;
  textq ; 
  time;
  timeLeft: number;
  interval;
  subscribeTimer: any;
  getExam(): void {
    // /5cfb9084dc4d755c73341c0b
    this.examService.getExam(this.main_exam_id).subscribe(
       (result) => {
         console.log(result);
         console.log(`examq id ${result.q._id}`);
         this.examId = result.q._id;
         this.questions = result.q.questions;
         this.time = result.time;
         this.timeLeft = this.time;
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

  }else {
 let q = this.questions[this.curentQuestionId];
 console.log(q);
 if (q.QuesType === 'Text') {
  this.obj = {
    question : q._id,
    answer  : this.textq
   };

 } else if (q.QuesType === 'Code') {

  this.obj = {
    question : q._id,
    answer  : this.textq
   };
 } else {
 this.obj = {
  question : q._id,
  answer  : this.curentAnswer
 };
}

 this.answers.push(this.obj);
 this.curentAnswer ='';
 this.textq = '';

  }
  console.log(`student answers : ${this.answers}`);

  this.answers.forEach(answer => {
  console.log(`q1 ${answer.question} : answer : ${answer.answer}`);
});
  console.log(this.curentAnswer);

  if (this.curentQuestionId === this.questions.length ) {
    // make submet
    // this.route
  } else {
    this.curentQuestionId += 1;
  }
}

prev() {
  if (this.curentQuestionId > 0) {

  this.curentQuestionId -= 1;
  }
}



submit() {



  this.examService.answerExam(this.examId, this.answers).subscribe(result => {
    if (result.message === 'saved ') {
      // this.router.navigate(['student/home']);

    }
  });
  alert('done save  شااااااااطر ي زفت');
  console.log('done');
}
  ngOnInit() {


  this.startTimer();
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

  // timer

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = this.time;
        alert('الوقت خلص ');
        this.pauseTimer();
        this.submit();
      }
    }, 1000*60 );
  }

  pauseTimer() {
    clearInterval(this.interval);
  }


}



