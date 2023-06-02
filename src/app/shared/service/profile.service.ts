import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { ApiConstant } from '../constants/api_constants';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profileData: BehaviorSubject<any>= new BehaviorSubject(null);

  constructor(
    private api_service:ApiService,
    private router: Router,
  ) { }


  getProfileData(isRedirect?: boolean){
    let $this=this
    this.api_service
    .ExecuteGet(this.api_service.baseUrl + ApiConstant.user_profile)
    .subscribe({next(value) {
      $this.handleResponse(isRedirect,value)
    },error(err){

    }})  
  }
  getProfileDataOwner(isRedirect?: boolean){
    let $this=this
    this.api_service
    .ExecuteGet(this.api_service.baseUrl + ApiConstant.bus_profile)
    .subscribe({next(value) {
      $this.handleResponseBus(isRedirect,value)
    },error(err){

    }})  
  }
  getProfileDataAdmin(isRedirect?: boolean){
    let $this=this
    this.api_service
    .ExecuteGet(this.api_service.baseUrl + ApiConstant.admin_profile)
    .subscribe({next(value) {
      $this.handleResponseAdmin(isRedirect,value)
    },error(err){

    }})  
  }
  handleResponse(isRedirect: any,value:any){
    this.profileData.next(value);
    if(isRedirect){
      this.redirectTo(value);
    }
  }
  handleResponseBus(isRedirect: any,value:any){
    this.profileData.next(value);
    if(isRedirect){
      this.redirectToBus(value);
    }
  }
  handleResponseAdmin(isRedirect: any,value:any){
    this.profileData.next(value);
    if(isRedirect){
      this.redirectToAdmin(value);
    }
  }
  redirectTo(value:any){
    this.router.navigate(['../user']);
  }
  redirectToBus(value:any){
    this.router.navigate(['../bus-owner']);
  }
  redirectToAdmin(value:any){
    this.router.navigate(['../admin']);
  }
}