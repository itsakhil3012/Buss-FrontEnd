import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusOwnerComponent } from './bus-owner.component';
import { BusComplaintComponent } from './component/bus-complaint/bus-complaint.component';
import { BusRejectComponent } from './component/bus-reject/bus-reject.component';

const routes: Routes = [
  {
    path:'',
    component:BusOwnerComponent
  },
  {
    path:'bus-complaint',
    component:BusComplaintComponent
  },
  {
    path:'bus-reject',
    component:BusRejectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusOwnerRoutingModule { }
