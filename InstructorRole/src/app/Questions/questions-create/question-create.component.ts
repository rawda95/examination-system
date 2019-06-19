
import { Component, OnInit, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Question} from '../question.model';
import { QuestionsService } from '../question.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {mimeType} from './mime-type-validator';
@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})

export class QuestionCreateComponent implements OnInit {
   enterTitleValue = '';
   enterContentValue = '';
   mode = 'create';
   question: Question;
   questionId: string;
   isLoading = false;
   form: FormGroup;
   imagePreview: string;

   questionTypes: string[] = ['MCQ', 'Multi Choose', 'Text'];
  // model.prop = 'A';

   questionCreated = new EventEmitter<Question>();

   constructor(public questionsService: QuestionsService, public route: ActivatedRoute) {

  }
   ngOnInit() {
     this.form = new FormGroup({
          title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
          content: new FormControl(null, {validators: [Validators.required]
      }),
          image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
      });


     this.route.paramMap.subscribe((paramMap: ParamMap) => {
     if (paramMap.has('questionId')) {
        this.mode = 'edit';
        this.questionId = paramMap.get('questionId');
        this.isLoading = true;
        this.questionsService.getQuestion(this.questionId)
        .subscribe(questionData => {
          this.isLoading = false;
          this.question = {id: questionData._id, title: questionData.title, content: questionData.content},
          this.form.setValue({title: this.question.title,content: this.question.content});

        });

     } else {
       this.mode = 'create';
       this.questionId = null;
     }
    });
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement ).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);


  }
  onSaveQuestion() {

      //  if(this.form.invalid)
      //  {
      //       return;
      //   }
       this.isLoading = true;
       if (this.mode === 'create') {
          this.questionsService.addQuestion
             (this.form.value.title,
              this.form.value.content,
              this.form.value.image);

      }
      else {
        this.questionsService.updateQuestion(this.questionId, this.form.value.title, this.form.value.content);
      }
       this.form.reset();
  }




}
