import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ApiConstant } from 'src/app/shared/constants/api_constants';
import { ApiService } from 'src/app/shared/service/api.service';
import { GeneralService } from 'src/app/shared/service/general.service';
import { ProfileService } from 'src/app/shared/service/profile.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  bus_list: any;
  bus_id:string='';
  private unsubscribe = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    public toaster: ToastrService,
    private api_service: ApiService,
    private router: Router,
    private general: GeneralService,
    private profile: ProfileService,
  ) {

  }

  getBusList() {
    let $this = this;
    this.api_service.ExecuteGet(this.api_service.baseUrl + ApiConstant.admin_unapprove_bus_list)
      .subscribe({
        next(value: any) {
          console.log("bus list", value)
          $this.bus_list = value?.Buses;

        },
        error(err) {
          console.log("Api calling error")
        },
      })

  }
  Submit(data: any) {
    this.bus_id=data?._id
    let $this = this
    this.api_service.ExecutePut(this.api_service.baseUrl + ApiConstant.admin_approve_bus,'',this.bus_id)
      .pipe(takeUntil(this.unsubscribe)).subscribe({
        next(value) {
          if (value) {
            $this.toaster?.success("Change done")
            $this.getBusList();
          }
        }, error(err) {
          $this.toaster.error(err.error.msg)
        },
      })


  }

  ngOnInit(): void {
    this.getBusList();
  }


}
