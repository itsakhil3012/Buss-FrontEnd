import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusOwnerComponent } from './bus-owner.component';
import { BusComplaintComponent } from './component/bus-complaint/bus-complaint.component';

const routes: Routes = [
  {
    path:'',
    component:BusOwnerComponent
  },
  {
    path:'bus-complaint',
    component:BusComplaintComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusOwnerRoutingModule { }
