import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ApiConstant } from 'src/app/shared/constants/api_constants';
import { ApiService } from 'src/app/shared/service/api.service';
import { GeneralService } from 'src/app/shared/service/general.service';
import { ProfileService } from 'src/app/shared/service/profile.service';

@Component({
  selector: 'app-add-bustype',
  templateUrl: './add-bustype.component.html',
  styleUrls: ['./add-bustype.component.scss']
})
export class AddBustypeComponent implements OnInit {

  add_bustype: FormGroup;
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
    this.add_bustype = this.formBuilder.group({
      bus_type: [null, [Validators.required]],
    })
  }
  form_control(property: string) {
    let controls = this.add_bustype.controls;
    if (this.button_action.submitted && controls[property].errors) {
      return true
    }
    else {
      return false
    }
  }
  onSubmit(data: any) {
    this.button_action.submitted = true;
    if (!this.add_bustype.valid) {
      this.toaster.error("Invalid Entries")
      return
    }
    let $this = this
    let valid_login = this.add_bustype.value;
    this.api_service.ExecutePost(this.api_service.baseUrl + ApiConstant.admin_add_bus_type, valid_login)
      .pipe(takeUntil(this.unsubscribe)).subscribe({
        next(value: any) {
          $this.toaster.success("Succesfully added your bus type");
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
