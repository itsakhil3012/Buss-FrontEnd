import { Component } from '@angular/core';
import { ProfileService } from './shared/service/profile.service';
import { GeneralService } from './shared/service/general.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bus';
  constructor(
    private ProfileService: ProfileService,
    private generalService: GeneralService,
  ) {
    if (generalService.getToken) {
      ProfileService.getProfileData();
    }
    if (generalService.getToken) {
      ProfileService.getProfileDataOwner();
    }
    if (generalService.getToken) {
      ProfileService.getProfileDataAdmin()
    }
  }
}
