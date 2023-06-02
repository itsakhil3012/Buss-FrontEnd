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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user_register: FormGroup;
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
    this.user_register = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }
  form_control(property: string) {
    let controls = this.user_register.controls;
    if (this.button_action.submitted && controls[property].errors) {
      return true
    }
    else {
      return false
    }
  }
  onSubmit(data: any) {
    localStorage.removeItem('Bus_token')
    this.button_action.submitted = true;
    if (!this.user_register.valid) {
      this.toaster.error("Invalid Entries")
      return
    }
    let $this = this
    let valid_register = this.user_register.value;
    $this.api_service.ExecutePost(this.api_service.baseUrl + ApiConstant.user_register, valid_register)
      .pipe(takeUntil(this.unsubscribe)).subscribe({
        next(value: any) {
          $this.toaster.success("Succesfully registered");
          $this.general.setToken = value.token;
          $this.profile.getProfileData(true);
        },
        error(err) {
          console.log("error", err)
          $this.toaster.error(err.error.message)
        },
      })

  }

  ngOnInit(): void {
  }

}
