import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { authenticationRoutingComponents, AuthenticationRoutingModule } from './authentication-routing.module';



@NgModule({
  declarations: [
    authenticationRoutingComponents
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
