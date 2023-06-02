import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren:()=> import('src/app/auth/auth.module').then(module=> module.AuthModule)
  },
  {
    path:'user',
    loadChildren:()=>import("src/app/user/user.module").then(module=> module.UserModule)
  },
  {
    path:'bus-owner',
    loadChildren:()=> import("src/app/bus-owner/bus-owner.module").then(module=> module.BusOwnerModule)
  },
  {
    path:'admin',
    loadChildren:()=> import("src/app/admin/admin.module").then(module=> module.AdminModule)
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
