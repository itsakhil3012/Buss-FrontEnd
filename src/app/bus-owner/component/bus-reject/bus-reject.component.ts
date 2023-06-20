import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiConstant } from 'src/app/shared/constants/api_constants';
import { ApiService } from 'src/app/shared/service/api.service';
import { GeneralService } from 'src/app/shared/service/general.service';
import { ProfileService } from 'src/app/shared/service/profile.service';

@Component({
  selector: 'app-bus-reject',
  templateUrl: './bus-reject.component.html',
  styleUrls: ['./bus-reject.component.scss']
})
export class BusRejectComponent implements OnInit {

  reject_list: any
  constructor(
    public toaster: ToastrService,
    private api_service: ApiService,
    private router: Router,
    private general: GeneralService,
    private profile: ProfileService,
  ) { }

  ngOnInit(): void {
    this.getRejectList()
  }

  getRejectList() {
    let $this = this;
    this.api_service.ExecuteGet(this.api_service.baseUrl + ApiConstant.reject_list)
      .subscribe({
        next(value: any) {
          console.log("reject list", value)
          $this.reject_list = value?.my_buses;
        },
        error(err) {
          console.log("Api calling error")
        },
      })
  }

}
