import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ApiConstant } from 'src/app/shared/constants/api_constants';
import { ApiService } from 'src/app/shared/service/api.service';
import { GeneralService } from 'src/app/shared/service/general.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
@Component({
  selector: 'app-bus-signup',
  templateUrl: './bus-signup.component.html',
  styleUrls: ['./bus-signup.component.scss']
})
export class BusSignupComponent implements OnInit {
  bus_login: FormGroup;
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
    this.bus_login = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  };
  form_control(property: string) {
    let controls = this.bus_login.controls;
    if (this.button_action.submitted && controls[property].errors) {
      return true
    }
    else {
      return false
    }
  }
  onSubmit(data: any) {

    this.button_action.submitted = true;
    if (!this.bus_login.valid) {
      this.toaster.error("Invalid Entries")
      return
    }
    let $this = this
    let valid_login = this.bus_login.value;
    this.api_service.ExecutePost(this.api_service.baseUrl + ApiConstant.bus_login, valid_login)
      .pipe(takeUntil(this.unsubscribe)).subscribe({
        next(value: any) {
          $this.toaster.success("Succesfully logged in");
          $this.general.setToken = value.token;
          $this.profile.getProfileDataOwner(true);
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