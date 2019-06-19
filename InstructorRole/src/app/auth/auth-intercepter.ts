import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable({providedIn:"root"})

export class AuthIntercepter implements HttpInterceptor{
    constructor(private authServive:AuthService){

    }
    intercept(request:HttpRequest<any>,next:HttpHandler){
        const authToken=this.authServive.getToken();
        const authRequest=request.clone({
            headers:request.headers.set('Authorization',"Bearer"+authToken)
        }) 
        return next.handle(authRequest);
    }
}
