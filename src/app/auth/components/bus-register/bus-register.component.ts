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
  selector: 'app-bus-register',
  templateUrl: './bus-register.component.html',
  styleUrls: ['./bus-register.component.scss']
})
export class BusRegisterComponent implements OnInit {
  bus_register: FormGroup;
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
    this.bus_register = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }
  form_control(property: string) {
    let controls = this.bus_register.controls;
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
    if (!this.bus_register.valid) {
      this.toaster.error("Invalid Entries")
      return
    }
    let $this = this
    let valid_register = this.bus_register.value;
    $this.api_service.ExecutePost(this.api_service.baseUrl + ApiConstant.bus_register, valid_register)
      .pipe(takeUntil(this.unsubscribe)).subscribe({
        next(value: any) {
          $this.handleLoginresponce(value)
        },
        error(err) {
          console.log("error", err)
          $this.toaster.error(err.error.msg)
        },
      })
  }
  handleLoginresponce(response:any){
    this.general.setToken = response?.token;
    this.profile.getProfileDataOwner(true);
  }

  ngOnInit(): void {
  }

}
