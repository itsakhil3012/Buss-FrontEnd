import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { GeneralService } from '../../service/general.service';
import { ApiConstant } from '../../constants/api_constants';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reject-popup',
  templateUrl: './reject-popup.component.html',
  styleUrls: ['./reject-popup.component.scss']
})
export class RejectPopupComponent implements OnInit {

  bus_data: any;
  bus_reject: FormGroup;
  private unsubscribe = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<RejectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public file_data: any,
    private router: ActivatedRoute,
    public toaster: ToastrService,
    private formBuilder: FormBuilder,
    private api_service: ApiService,
    private general: GeneralService,

  ) {

    this.bus_data = file_data;
    console.log("bus data", this.bus_data)
    this.bus_reject = this.formBuilder.group({
      reason: [],
      id:[this.bus_data?.id]
    })
  }


  ngOnInit(): void {

  }
  rejectApi(data: any) {
   

    let $this = this
    this.api_service.ExecutePost(this.api_service.baseUrl + ApiConstant.reject_bus,data)
      .pipe(takeUntil(this.unsubscribe)).subscribe({
        next(value) {
          if (value) {
            $this.toaster?.success("Change done")
          }
        }, error(err) {
          $this.toaster.error(err.error.msg)
        },
      })
  }

}
