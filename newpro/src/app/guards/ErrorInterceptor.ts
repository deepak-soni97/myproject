import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

//import { SvcAuthenticationService } from "@AppServices";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            // if ([401, 403].includes(err.status)) {
            //     //debugger;
            //     // this.authenticationService.RefreshToken();
            //     // // auto logout if 401 or 403 response returned from api
            //     this.authenticationService.Logout();
            //     // window.location.href = "/login";
            // }

            const error = (err && err.error && err.error.message) || err.statusText;
            console.error(err);
            return throwError(error);
        }))
    }
}