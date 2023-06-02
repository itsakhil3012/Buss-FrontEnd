import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiConstant } from 'src/app/shared/constants/api_constants';
import { ApiService } from 'src/app/shared/service/api.service';
import { GeneralService } from 'src/app/shared/service/general.service';
import { ProfileService } from 'src/app/shared/service/profile.service';

@Component({
  selector: 'app-view-complaints',
  templateUrl: './view-complaints.component.html',
  styleUrls: ['./view-complaints.component.scss']
})
export class ViewComplaintsComponent implements OnInit {

  complaints_list:any;
  constructor(
    private formBuilder: FormBuilder,
    public toaster: ToastrService,
    private api_service: ApiService,
    private router: Router,
    private general: GeneralService,
    private profile: ProfileService,
  ) { }

  getComplaintList() {
    let $this = this;
    this.api_service.ExecuteGet(this.api_service.baseUrl + ApiConstant.admin_complaints_list)
      .subscribe({
        next(value: any) {
          console.log("data",value)
          $this.complaints_list = value?.complaints;
        },
        error(err) {
          console.log("Api calling error")
        },
      })
  }

  ngOnInit(): void {
    this.getComplaintList()
  }

}
