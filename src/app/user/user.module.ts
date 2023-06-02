import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared.module';
import { UserComplaintsComponent } from './components/user-complaints/user-complaints.component';



@NgModule({
  declarations: [
    UserComponent,
    UserComplaintsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    
  ]
})
export class UserModule { }
