import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/service/api.service';
import { Router } from '@angular/router';
import { GeneralService } from '../shared/service/general.service';
import { ProfileService } from '../shared/service/profile.service';
import { ApiConstant } from '../shared/constants/api_constants';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-bus-owner',
  templateUrl: './bus-owner.component.html',
  styleUrls: ['./bus-owner.component.scss']
})
export class BusOwnerComponent implements OnInit {
  @Input() isRequired: boolean = false;
  @Output() timeChange: EventEmitter<string> = new EventEmitter<string>();
  bus_form: FormGroup;
  location: string = '';
  button_action: any = {
    submitted: false,
    api_loader: false,
    password_view: false,
    confirm_password_view: false
  }
  current_location: any;
  destination_location: any;
  destination_from: string = '';
  destination_to: string = '1'
  bus_route: any;
  bus_name_list: any = [];
  bus_complaint_name: string = '';
  selectedTime: string = '';
  bus_list: any;
  bus_type: string = ''
  private unsubscribe = new Subject<void>();


  constructor(
    private formBuilder: FormBuilder,
    public toaster: ToastrService,
    private api_service: ApiService,
    private router: Router,
    private general: GeneralService,
    private profile: ProfileService,
  ) {

    this.bus_form = this.formBuilder.group({
      name: [null, [Validators.required]],
      bus_type: [null, [Validators.required]],
      location: [null, [Validators.required]],
      route_from: [null, [Validators.required]],
      route_to: [null, [Validators.required]],
      starting_time: [null, [Validators.required]],
      ending_time: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getCurentLocation();
    this.getBusList();
  }
  form_control(property: string) {
    let controls = this.bus_form.controls;
    if (this.button_action.submitted && controls[property].errors) {
      return true
    }
    else {
      return false
    }
  }
  getCurentLocation() {
    let $this = this;
    this.api_service.ExecuteGet(this.api_service.baseUrl + ApiConstant.bus_owner_location)
      .subscribe({
        next(value: any) {
          console.log("location", value)
          $this.current_location = value?.locations;
        },
        error(err) {
          console.log("Api calling error")
        },
      })
  }
  getBusList() {
    let $this = this;
    this.api_service.ExecuteGet(this.api_service.baseUrl + ApiConstant.bus_owner_bus_list)
      .subscribe({
        next(value: any) {
          console.log("list", value?.busTypes)
          $this.bus_list = value?.busTypes;
        },
        error(err) {
          console.log("Api calling error")
        },
      })
  }

  locationSubmit(data: any) {
    console.log("data",data)
    this.location = data?.location;
    this.bus_form?.patchValue({
      location: data?.location
    })

  }
  dataTypeSubmit(data: any) {

    this.bus_type = data?.bus_type;
    this.bus_form?.patchValue({
      bus_type: data?._id
    })
  }
  onSubmit(data: any) {
    this.button_action.submitted = true;
    if (!this.bus_form.valid) {
      this.toaster.error("Invalid Entries")
      return
    }
    let $this = this
    let form_data = this.bus_form?.value;
    this.api_service.ExecutePost(this.api_service.baseUrl + ApiConstant.bus_registration,form_data)
      .pipe(takeUntil(this.unsubscribe)).subscribe({
        next(value: any) {
          $this.toaster.success("New Bus added");
        },
        error(err) {
          console.log("error", err)
          $this.toaster.error(err.error.msg)
        },
      })

  }


}
