import { LoginService } from './auth/login/login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(loginService: LoginService, router: Router) {
    if (loginService.getIsAuth()) {
      router.navigate(['/login']);
    }
}

}