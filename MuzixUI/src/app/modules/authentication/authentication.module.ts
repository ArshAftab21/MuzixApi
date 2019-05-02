import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { AuthenticationRouterModule } from '../authentication/authentication-router.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AuthenticationRouterModule
  ],
  providers: [AuthenticationService],
  exports: [
    AuthenticationRouterModule
  ]
})
export class AuthenticationModule { }
