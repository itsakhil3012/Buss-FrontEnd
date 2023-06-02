import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiConstant } from 'src/app/shared/constants/api_constants';
import { ApiService } from 'src/app/shared/service/api.service';
import { GeneralService } from 'src/app/shared/service/general.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  add_location: FormGroup;
  button_action: any = {
    submitted: false,
    api_loader: false,
    password_view: false,
    confirm_password_view: false
  }
  private unsubscribe = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    public toaster: ToastrService,
    private api_service: ApiService,
    private router: Router,
    private general: GeneralService,
    private profile: ProfileService,
  ) {
    this.add_location = this.formBuilder.group({
      location: [null, [Validators.required]],
    })
  }
  form_control(property: string) {
    let controls = this.add_location.controls;
    if (this.button_action.submitted && controls[property].errors) {
      return true
    }
    else {
      return false
    }
  }
  onSubmit(data: any) {
    this.button_action.submitted = true;
    if (!this.add_location.valid) {
      this.toaster.error("Invalid Entries")
      return
    }
    let $this = this
    let valid_login = this.add_location.value;
    this.api_service.ExecutePost(this.api_service.baseUrl + ApiConstant.admin_add_location, valid_login)
      .pipe(takeUntil(this.unsubscribe)).subscribe({
        next(value: any) {
          $this.toaster.success("Succesfully added your location");
        },
        error(err) {
          console.log("error", err)
          $this.toaster.error(err.error.msg)
        },
      })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
