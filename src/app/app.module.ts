import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetPasswordRequestComponent } from './components/reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InsideAppComponent } from './components/inside-app/inside-app.component';
import { JwtInterceptor } from './config/jwt-interceptor';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { StudentHomeComponent } from './components/home-student/student-home.component';
import { TeacherHomeComponent } from './components/home-teacher/teacher-home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { StudentMyCoursesComponent } from './components/my-courses-student/student-my-courses.component';
import { TeacherMyCoursesComponent } from './components/my-courses-teacher/teacher-my-courses.component';
import { ManageExamsComponent } from './components/mangage-exams/mangage-exams.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ExamResultsComponent } from './components/exam-results/exam-results.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ExamDetailsComponent } from './components/exam-details/exam-details.component';
import { VoteExamComponent } from './components/vote-exam/vote-exam.component';
import { AddExamComponent } from './components/add-exam/add-exam.component';
import { MyExamsComponent } from './components/my-exams/my-exams.component';
import { MyExamsTeacherComponent } from './components/my-exams-teacher/my-exams-teacher.component';
import { MyExamsStudentComponent } from './components/my-exams-student/my-exams-student.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ResetPasswordRequestComponent,
    ResetPasswordComponent,
    NavbarComponent,
    InsideAppComponent,
    HomepageComponent,
    StudentHomeComponent,
    TeacherHomeComponent,
    CoursesComponent,
    MyCoursesComponent,
    StudentMyCoursesComponent,
    TeacherMyCoursesComponent,
    ManageExamsComponent,
    ContactUsComponent,
    ExamResultsComponent,
    ExamDetailsComponent,
    VoteExamComponent,
    AddExamComponent,
    MyExamsComponent,
    MyExamsTeacherComponent,
    MyExamsStudentComponent,
    AddCourseComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CKEditorModule,
    NgMultiSelectDropDownModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
