import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { Question} from '../question.model';
import { QuestionsService } from '../question.service';
import { from } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {


  questions: Question[] = [];
  isLoading = false;
  private questionSubscription: Subscription;
  private authStatuseSub: Subscription;
  private userIsAuthenticate = false;

  constructor(public questionService: QuestionsService, private authService: AuthService) {

   }

  ngOnInit() {
    this.isLoading = true;
    this.questionService.getQuestions();
    this.questionSubscription = this.questionService.getQuestionUpsdateListener()
    .subscribe((questions: Question[]) => {
      this.isLoading = false;
      this.questions = questions;
    });
    this.userIsAuthenticate = this.authService.getIsAuth();
    this.authStatuseSub = this.authService.getAuthStatuseListener()
    .subscribe(isAuthenticated => {
        this.userIsAuthenticate = isAuthenticated;
    });
  }

onDelete(questionId: string) {
this.questionService.deleteQuestion(questionId);
}
ngOnDestroy() {
  this.questionSubscription.unsubscribe();
  this.authStatuseSub.unsubscribe();
}
}
