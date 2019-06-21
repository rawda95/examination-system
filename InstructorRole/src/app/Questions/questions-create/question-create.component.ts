
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
   questionType: string;
   isLoading = false;
   form: FormGroup;
   imagePreview: string;

   questionTypes: string[] = ['Choice', 'TrueOrFalse', 'Text', 'Code'];

   levels: string[] = ['Easy' ,' Normal' ,'Hard'];
  // model.prop = 'A';

   questionCreated = new EventEmitter<Question>();

   constructor(public questionsService: QuestionsService, public route: ActivatedRoute) {

  }












  onItemChange(event) {
    console.log(`event target ${event.target.value}`);
    this.questionType = event.target.value ;
    console.log(`curent answer  ${this.questionType}`);

  }

  onLevelSelected(event) {
   
     console.log(event.target.value);

    // $(this).parents('.input-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');       
 


  }








   ngOnInit() {
     this.form = new FormGroup({
          title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
           level: new FormControl(null, {validators: [Validators.required]
      }),
      correcAns: new FormControl(null, {validators: [Validators.required]

      }),
      questionType: new FormControl(null, {validators: [Validators.required]

      }),
      answer1: new FormControl(null),
      answer2: new FormControl(null),
      answer3: new FormControl(null),
      answer4: new FormControl(null),




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
          this.form.setValue({title: this.question.title, content: this.question.content});

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



        // const obj = {
        //   body: this.form.value.title,
        //   level: this.form.value.level,
        //   correctAns : this.form.correcAns,
        //   Subject : this.form.Subject,
        //   QuesType: this.questionType,


        // };


        if (this.questionType === 'Choice') {

          console.log('in choise question');
          console.log(this.form.value.answer1);
          this.questionsService.addQuestion
             (this.form.value.title,
              this.form.value.level,
              this.form.value.correcAns,
              this.questionType,
              this.form.value.answer1,
              this.form.value.answer2,
              this.form.value.answer3
              );


        }else {
          this.questionsService.addQuestion
             (this.form.value.title,
              this.form.value.level,
              this.form.value.correcAns,
              this.questionType,
             );

        }



        // this.questionsService.addQuestion
        //      (this.form.value.title,
        //       this.form.value.content,
        //       this.form.value.answer4);

      } else {
        // this.questionsService.updateQuestion(this.questionId, this.form.value.title, this.form.value.content);
      }
       this.form.reset();
  }




}
