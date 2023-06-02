import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ApiConstant } from 'src/app/shared/constants/api_constants';
import { ApiService } from 'src/app/shared/service/api.service';
import { GeneralService } from 'src/app/shared/service/general.service';
import { ProfileService } from 'src/app/shared/service/profile.service';

@Component({
  selector: 'app-user-complaints',
  templateUrl: './user-complaints.component.html',
  styleUrls: ['./user-complaints.component.scss']
})
export class UserComplaintsComponent implements OnInit {
  complaint_form: FormGroup;
  button_action: any = {
    submitted: false,
    api_loader: false,
    password_view: false,
    confirm_password_view: false
  }
  bus_name_list: any = [];
  bus_comp_name:any;
  private unsubscribe = new Subject<void>();
  bus_complaint_name: string = ''
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
  form_control(property: string) {
    let controls = this.complaint_form.controls;
    if (this.button_action.submitted && controls[property].errors) {
      return true
    }
    else {
      return false
    }
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
          $this.toaster.error(err.error.message)
        },
      })

  }
  busList(data: any) {
    this.bus_complaint_name=data?.name;
    this.complaint_form?.patchValue({
      bus: data?._id

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
  getBusComplaintList(){
    let $this = this;
    this.api_service.ExecuteGet(this.api_service.baseUrl + ApiConstant.user_list_bus_complaint)
      .subscribe({
        next(value: any) {
          console.log("value",value)
          // $this.bus_name_list = value?.buses;
          $this.bus_comp_name=value?.buses
        },
        error(err) {
          console.log("Api calling error")
        },
      })
  }
  ngOnInit(): void {
    this.getBusList();
    this. getBusComplaintList()
  }

}
