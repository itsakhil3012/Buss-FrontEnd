import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/shared/service/api.service';
import { GeneralService } from 'src/app/shared/service/general.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { ApiConstant } from 'src/app/shared/constants/api_constants';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  admin_login: FormGroup;
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
    this.admin_login = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }
  form_control(property: string) {
    let controls = this.admin_login.controls;
    if (this.button_action.submitted && controls[property].errors) {
      return true
    }
    else {
      return false
    }
  }
  onSubmit(data: any) {
    this.button_action.submitted = true;
    if (!this.admin_login.valid) {
      this.toaster.error("Invalid Entries")
      return
    }
    let $this = this
    let valid_login = this.admin_login.value;
    this.api_service.ExecutePost(this.api_service.baseUrl +ApiConstant.admin_login, valid_login)
      .pipe(takeUntil(this.unsubscribe)).subscribe({
        next(value: any) {
          $this.toaster.success("Succesfully logged in");
          $this.general.setToken = value.token;
          $this.profile.getProfileDataAdmin(true);
        },
        error(err) {
          console.log("error", err)
          $this.toaster.error(err.error.message)
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
