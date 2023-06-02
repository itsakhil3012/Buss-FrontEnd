import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  sidebar_status = new BehaviorSubject(null)

  constructor(
    private router: Router
  ) { }
  changeSidebarStatus(value: any) {
    this.sidebar_status.next(value)
  }

  set setToken(token: any) {
    localStorage.setItem('Bus_token',token)
  }

  get getToken() {
    if (localStorage.getItem('Bus_token')) {
      return localStorage.getItem('Bus_token')
    }
    else {
      return null
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/'])
  }
}