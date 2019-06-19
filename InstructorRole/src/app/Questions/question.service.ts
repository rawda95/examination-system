import { Question } from './question.model';
import {Subject, from} from 'rxjs'
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
// import { question } from 'selenium-webdriver/http';
import { Router } from '@angular/router';
@Injectable({providedIn:'root'})
export class QuestionsService{
    private questions:Question[]=[];
    private questionsUpdated=new Subject<Question[]>();


    constructor(private httpClient:HttpClient,private router:Router){

    }
    getQuestions(){
        this.httpClient.get<{message:string,questions:any}>("http://localhost:3000/api/questions").
        pipe(map((questionData)=>{
          return questionData.questions.map(question=>{
            return {
              title:question.title,
              content:question.content,
              id:question._id
            }
          })
        }))
        .subscribe((transformedquestion)=>{
          this.questions=transformedquestion;
          this.questionsUpdated.next([...this.questions])
        });
    }
    getQuestionUpsdateListener(){
      return this.questionsUpdated.asObservable();
    }


    getQuestion(id:string){
      return this.httpClient.get<{_id:string,title:string,content:string}>("http://localhost:3000/api/questions/"+id);
    }

  

    addQuestion(title:string,content:string,image:File)
    {
      const questionData=new FormData();
      questionData.append("title",title);
      questionData.append("content",content);
      questionData.append("image",image,title);


      this.httpClient.post<{message:string,questionId:string}>("http://localhost:3000/api/questions",questionData)
      .subscribe(responseData=>{
          const question:Question={id:responseData.questionId,title:title,content:content}
          
          this.questions.push(question);
          this.questionsUpdated.next([...this.questions])
          this.router.navigate(["/"])
      });
      
    }


    updateQuestion(id:string,title:string,content:string){
      const question:Question={id:id,title:title,content:content};
      this.httpClient.put("http://localhost:3000/api/questions/"+id,question)
      .subscribe(
        response=>{
          console.log(response);
          const updatedquestions=[...this.questions];
          const oldquestionIndex=updatedquestions.findIndex(p=>p.id===question.id);
          updatedquestions[oldquestionIndex]=question;
          this.questions=updatedquestions;
          this.questionsUpdated.next([...this.questions]);
          this.router.navigate(["/"])

        });
    } 
deleteQuestion(questionId:string){
  this.httpClient.delete("http://localhost:3000/api/questions/"+questionId)
  .subscribe(()=>{
    // console.log("deleting");
    const updatedquestions=this.questions.filter(question=>question.id !==questionId);
    this.questions=updatedquestions;
    this.questionsUpdated.next([...this.questions]);
    // console.log("deleting");
});
}

}

