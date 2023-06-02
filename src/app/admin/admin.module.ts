import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { AddBustypeComponent } from './components/add-bustype/add-bustype.component';
import { ViewComplaintsComponent } from './components/view-complaints/view-complaints.component';




@NgModule({
  declarations: [
    AdminComponent,
    AdminPageComponent,
    AddLocationComponent,
    AddBustypeComponent,
    ViewComplaintsComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule

  ]
})
export class AdminModule { }
