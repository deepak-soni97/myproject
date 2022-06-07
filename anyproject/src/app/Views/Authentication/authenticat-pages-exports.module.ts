import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationStudentPageComponent } from './registration-student-page/registration-student-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationTeacherPageComponent } from './registration-teacher-page/registration-teacher-page.component';
import { WebConfig } from '@AppConfigs/WebConfig';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const appRoutes: Routes = [
  {
    path: WebConfig.PagesName.LoginPage, component: LoginPageComponent
  },
  { path: 'registration', component: RegistrationStudentPageComponent },
  { path: 'teacher', component: RegistrationTeacherPageComponent },
  { path: WebConfig.PagesName.ForgotPassword, component: ForgetPasswordComponent },
  { path: WebConfig.PagesName.ResetPassword, component: ResetPasswordComponent },
];

@NgModule({
  declarations: [
    RegistrationStudentPageComponent,
    LoginPageComponent,
    RegistrationTeacherPageComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' }),

  ]
})
export class AuthenticatPagesExportsModule { }
