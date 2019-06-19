import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {LoginService} from '../auth/login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 userIsAuthenticated = false;
 role   ; 
private authListenerSubs: Subscription;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.authListenerSubs = this.loginService.getAuthStatuseListener()
    .subscribe(IsAuthenticated => {
      this.userIsAuthenticated = IsAuthenticated;
    });
    if(localStorage.getItem('role')){
    this.role = localStorage.getItem('role');
    }
  }
  onLogOut() {
    this.loginService.logout();
  }
  OnDestroy() {

  }

}
