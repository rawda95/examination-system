import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../auth/login/login.service';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {

    }
    canActivate(route: import ('@angular/router').ActivatedRouteSnapshot, state: import ('@angular/router').RouterStateSnapshot): boolean | import ('@angular/router').UrlTree | import ('rxjs').Observable<boolean | import ('@angular/router').UrlTree> | Promise<boolean | import ('@angular/router').UrlTree> {
        const isAuth = this.loginService.getIsAuth();
        if (!isAuth) {
           this.router.navigate(['/login']);
        }
        return isAuth;

    }

}
