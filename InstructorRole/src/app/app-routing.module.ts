import { StudentHomeComponent } from './Student/student-home/student-home.component';
import { NgModel } from '@angular/forms';

import {RouterModule, Routes} from '@angular/router';
// import {QuestionListComponent} from './Questions/questions-list/question-list.component';
import { QuestionCreateComponent } from './Questions/questions-create/question-create.component';

import { from } from 'rxjs';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signUp/signUp.component';
import { AuthGuard } from './auth/auth.guard';
import { CoursesComponent } from './courses/courses.component';
// import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InstructorHomeComponent } from './instructor-home/instructor-home.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { InstructorReportComponent } from './instructor-report/instructor-report.component';
import { CourseInfoComponent } from './courses/course-info/course-info.component';
import { IndexComponent } from './index/index.component';
import { StudentAvailableExamComponent } from './Student/student-available-exam/student-available-exam.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { StudentCoursesComponent } from './Student/student-courses/student-courses.component';
import { ProfileComponent } from './Student/profile/profile.component';
import { ExamComponent } from './Exam/exam.component';

import { InstructorCoursesComponent } from './Instructor/instructor-courses/instructor-courses.component';

const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'create', component: QuestionCreateComponent},
    {path: 'edit/:questionId', component: QuestionCreateComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'signUp', component: SignUpComponent},
    // {path:'signUp',component:SignUpComponent},
    {path: 'teacher/courses', component:InstructorCoursesComponent, canActivate: [AuthGuard]},
    {path: 'footer', component: FooterComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: InstructorProfileComponent, canActivate: [AuthGuard]},
    {path: 'report', component: InstructorReportComponent, canActivate: [AuthGuard]},
    {path: 'getCoursInfo/:id', component: CourseInfoComponent , canActivate: [AuthGuard]},
    {path: 'student/exams', component: StudentAvailableExamComponent , canActivate: [AuthGuard]},
    {path: 'student/course', component: CoursesComponent , canActivate: [AuthGuard]},
    {path: 'student/profile', component: ProfileComponent , canActivate: [AuthGuard]},
    {path: 'exam/:main_exam_id', component: ExamComponent, canActivate: [AuthGuard]},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent}




];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]


})
export class AppRoutingModule {

}
