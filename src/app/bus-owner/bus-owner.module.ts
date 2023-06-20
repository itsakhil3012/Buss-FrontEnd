import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusOwnerRoutingModule } from './bus-owner-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BusComplaintComponent } from './component/bus-complaint/bus-complaint.component';
import { BusRejectComponent } from './component/bus-reject/bus-reject.component';


@NgModule({
  declarations: [
    BusComplaintComponent,
    BusRejectComponent
  ],
  imports: [
    CommonModule,
    BusOwnerRoutingModule,
    SharedModule
  ]
})
export class BusOwnerModule { }
