import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BusRegisterComponent } from './components/bus-register/bus-register.component';
import { BusSignupComponent } from './components/bus-signup/bus-signup.component';
import { AdminComponent } from '../admin/admin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

const routes: Routes = [
  {
    path:'',
    component:AuthComponent,
    children:[
      {
        path:'',
        pathMatch:'full',
        redirectTo:'landing-page'
      },
      {
        path:'landing-page',
        component:LandingPageComponent,
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'register',
        component:RegisterComponent,
      },
      {
        path:'bus-login',
        component:BusSignupComponent
      },
      {
        path:'bus-regiter',
        component:BusRegisterComponent
      },
      {
        path:"admin-login",
        component:AdminLoginComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AuthRoutingModule { }
