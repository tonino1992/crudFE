import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ExamResultsComponent } from './components/exam-results/exam-results.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { InsideAppComponent } from './components/inside-app/inside-app.component';
import { LoginComponent } from './components/login/login.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { MyExamsComponent } from './components/my-exams/my-exams.component';
import { ResetPasswordRequestComponent } from './components/reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'reset-password-request', component: ResetPasswordRequestComponent },
  { path: 'reset-password/:id', component: ResetPasswordComponent },
  { path: 'app', redirectTo: '/app/home', pathMatch: 'full' },
  {
    path: 'app', component: InsideAppComponent,
    children: [
      { path: 'home', component: HomepageComponent },
      {path: 'courses', component: CoursesComponent},
      {path: 'mycourses', component: MyCoursesComponent},
      {path: 'contact-us', component: ContactUsComponent},
      {path: 'myexams', component: MyExamsComponent},
      {path: 'exam-result', component: ExamResultsComponent},
      {path: 'account', component: AccountComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
