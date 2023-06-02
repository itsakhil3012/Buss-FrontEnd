import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/service/api.service';
import { GeneralService } from 'src/app/shared/service/general.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { FormBuilder } from '@angular/forms';
import { ApiConstant } from 'src/app/shared/constants/api_constants';

@Component({
  selector: 'app-bus-complaint',
  templateUrl: './bus-complaint.component.html',
  styleUrls: ['./bus-complaint.component.scss']
})
export class BusComplaintComponent implements OnInit {

  complaints_list:any;
  constructor(
    private formBuilder: FormBuilder,
    public toaster: ToastrService,
    private api_service: ApiService,
    private router: Router,
    private general: GeneralService,
    private profile: ProfileService,
  ) { }

  ngOnInit(): void {
    this.getComplaintList()
  }
  getComplaintList() {
    let $this = this;
    this.api_service.ExecuteGet(this.api_service.baseUrl + ApiConstant.bus_owner_complaint)
      .subscribe({
        next(value: any) {
          console.log("complaint",value)
          $this.complaints_list = value?.complaints;
        },
        error(err) {
          console.log("Api calling error")
        },
      })
  }

}
