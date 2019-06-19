import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { QuestionCreateComponent } from './Questions/questions-create/question-create.component';
import {MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { QuestionListComponent } from './Questions/questions-list/question-list.component';
import { QuestionsService } from './Questions/question.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { from } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import {LoginComponent} from './auth/login/login.component'
import {SignUpComponent} from './auth/signUp/signUp.component'
import { AuthIntercepter } from './auth/auth-intercepter';
import { CoursesComponent } from './courses/courses.component';
import {  NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { InstructorHomeComponent } from './instructor-home/instructor-home.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { InstructorReportComponent } from './instructor-report/instructor-report.component';
import { CourseInfoComponent } from './courses/course-info/course-info.component';
import {StudentHomeComponent} from './Student/student-home/student-home.component';
import { IndexComponent } from './index/index.component';
import { StudentAvailableExamComponent } from './Student/student-available-exam/student-available-exam.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { StudentCoursesComponent } from './Student/student-courses/student-courses.component';
import { ProfileComponent } from './Student/profile/profile.component';
import { ExamComponent } from './Exam/exam.component';
@NgModule({
  declarations: [
    AppComponent,
    QuestionCreateComponent,
    HeaderComponent,
    QuestionListComponent,
    LoginComponent,
    SignUpComponent,
    CoursesComponent,
    FooterComponent,
    BannerComponent,
    InstructorHomeComponent,
    InstructorProfileComponent,
    InstructorReportComponent,
    CourseInfoComponent,
    StudentHomeComponent,
    IndexComponent,
    StudentAvailableExamComponent,
    AboutComponent,
    ContactComponent,
    StudentCoursesComponent,
    ProfileComponent,
    ExamComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,FormsModule,BrowserAnimationsModule,
    MatInputModule,MatCardModule,MatButtonModule,MatToolbarModule,
    MatExpansionModule,HttpClientModule,AppRoutingModule, MatPaginatorModule, 
    MatSortModule,MatTableModule,MatProgressSpinnerModule,MatRadioModule, MDBBootstrapModule.forRoot()
  ],
  exports: [ ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthIntercepter,multi:true}],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
