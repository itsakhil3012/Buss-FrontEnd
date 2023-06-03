import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../shared/service/api.service';
import { Router } from '@angular/router';
import { GeneralService } from '../shared/service/general.service';
import { ProfileService } from '../shared/service/profile.service';
import { ApiConstant } from '../shared/constants/api_constants';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  complaint_form: FormGroup;
  button_action: any = {
    submitted: false,
    api_loader: false,
    password_view: false,
    confirm_password_view: false
  }
  location: string = ''
  current_location: any;
  destination_location: any;
  destination_location_from: any;
  destination_location_to: any;
  destination_from: string = '';
  destination_to: string = ''
  bus_route: any;
  bus_name_list: any = [];
  bus_type:any
  bus_complaint_name: string = ''
  bus_type_name:string='';
  private unsubscribe = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    public toaster: ToastrService,
    private api_service: ApiService,
    private router: Router,
    private general: GeneralService,
    private profile: ProfileService,

  ) {
    this.complaint_form = this.formBuilder.group({
      problem: [null],
      comment: [null],
      bus: [this.bus_complaint_name]
    })
  }

  ngOnInit(): void {
    this.getCurentLocation();
    this.getBusList();
    this.getBusType();
  }
  form_control(property: string) {
    let controls = this.complaint_form.controls;
    if (this.button_action.submitted && controls[property].errors) {
      return true
    }
    else {
      return false
    }
  }
  getCurentLocation() {
    let $this = this;
    this.api_service.ExecuteGet(this.api_service.baseUrl + ApiConstant.bus_current_location)
      .subscribe({
        next(value: any) {
          $this.current_location = value.locations;
        },
        error(err) {
          console.log("Api calling error")
        },
      })
  }
  getBusDetails(location: string) {
    let query = new HttpParams();
    query = query.set('location', location)
    let $this = this;
    this.api_service.ExecuteGet(this.api_service.baseUrl + ApiConstant.bus_destination, '', query)
      .subscribe({
        next(value: any) {
          console.log("data",value?.RouteFrom)
          $this.destination_location = value;
          $this.destination_location_from=value?.RouteFrom;
          $this.destination_location_to=value?.RouteTo
        },
        error(err) {
          console.log("Api calling error")
        },
      })
  }
  getBusType(){
    let $this = this;
    this.api_service.ExecuteGet(this.api_service.baseUrl + ApiConstant.bus_type_list)
      .subscribe({
        next(value: any) {
   
          $this.bus_type = value?.busTypes;
          console.log("value",$this.bus_type)
        },
        error(err) {
          console.log("Api calling error")
        },
      })
  }
  getBusRoutes(location: string, destination_from: string, destination_to: string,bus_type:string) {
    let query = new HttpParams();
    query = query.set('location', location);
    query = query.set('from', destination_from);
    query = query.set('to', destination_to);
    let $this = this;
    this.api_service.ExecuteGet(this.api_service.baseUrl + ApiConstant.bus_route, '', query)
      .subscribe({
        next(value: any) {
      
          $this.bus_route = value?.buses;
          console.log('value',value?.value)
        },
      })
  }
  getBusList() {
    let $this = this;
    this.api_service.ExecuteGet(this.api_service.baseUrl + ApiConstant.bus_name)
      .subscribe({
        next(value: any) {
          $this.bus_name_list = value?.buses;
        },
        error(err) {
          console.log("Api calling error")
        },
      })
  }

  locationSubmit(data: string) {
    this.location = data;
    this.getBusDetails(this.location)
  }
  destinationSubmitFrom(data: string) {
    console.log("from", data);
    this.destination_from = data;
  }
  destinationSubmitTo(data: string) {
    console.log("to", data);
    this.destination_to = data
  }
  busTypeSubmit(data:any){
    this.bus_type_name=data?.bus_type
  }
  busList(data: string) {
    this.complaint_form?.patchValue({
      bus: data
    })

  }
  searchbus() {
    this.getBusRoutes(this.location, this.destination_from, this.destination_to,this.bus_type_name);
  }
  onSubmit(data: any) {
    this.button_action.submitted = true;
    if (!this.complaint_form.valid) {
      this.toaster.error("Invalid Entries")
      return
    }
    let $this = this
    let complaint_data = this.complaint_form?.value;
    this.api_service.ExecutePost(this.api_service.baseUrl + ApiConstant.user_complaint_post, complaint_data)
      .pipe(takeUntil(this.unsubscribe)).subscribe({
        next(value: any) {
          $this.toaster.success("Complaint Registered");
        },
        error(err) {
          console.log("error", err)
          $this.toaster.error(err.error.ms)
        },
      })

  }


}
