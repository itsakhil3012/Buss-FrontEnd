import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { AddBustypeComponent } from './components/add-bustype/add-bustype.component';
import { ViewComplaintsComponent } from './components/view-complaints/view-complaints.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'',
        pathMatch:'full',
        redirectTo:'admin-page'
      },
      {
        path:'admin-page',
        component:AdminPageComponent
      },
      {
        path:'add-location',
        component:AddLocationComponent
      },
      {
        path:'add-bustype',
        component:AddBustypeComponent
      },
      {
        path:'view-complaints',
        component:ViewComplaintsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
