import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserComplaintsComponent } from './components/user-complaints/user-complaints.component';


const routes: Routes = [{
  path: '',
  component: UserComponent,
},
{
  path:'user-complaint',
  component:UserComplaintsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
