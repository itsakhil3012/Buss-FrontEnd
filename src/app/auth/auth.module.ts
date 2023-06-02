import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { BusRegisterComponent } from './components/bus-register/bus-register.component';
import { BusSignupComponent } from './components/bus-signup/bus-signup.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    BusRegisterComponent,
    BusSignupComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule { }
