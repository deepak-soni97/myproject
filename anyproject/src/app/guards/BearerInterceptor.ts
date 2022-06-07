import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { SvcLocalStorageService, DialogConfirmService, SvcAuthenticationService } from "@AppServices";
import { Observable } from 'rxjs';
import { environment } from '@AppConfigs/environment';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {
    private requests: any[] = [];
    private requestPending: any[] = [];
    isRefreshTokenInProg: boolean = false;
    constructor(public svcLocalStorage: SvcLocalStorageService, private svcAuth: SvcAuthenticationService, public svcLoader: DialogConfirmService) {
    }
    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req.url);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        // this.svcLoader.isLoading.next(this.requests.length > 0);
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        this.requests.push(request.url);
        //this.svcLoader.isLoading.next(true);
        let userObj = this.svcLocalStorage.GetData(environment.AuthTokenKeyLSKey);
        let token = userObj ? `Bearer ${(JSON.parse(userObj).token)}` : "";

        request = request.clone({
            setHeaders: {
                Authorization: token,
                //"set-cookie":'seen=true;path=/'
            },
            withCredentials: true
        });

        return Observable.create((observer: any) => {
            const subscription = next.handle(request)
                .subscribe(
                    event => {

                        if (event instanceof HttpResponse) {

                            this.svcLoader.isLoading.next(false);
                            this.removeRequest(request);
                            observer.next(event);
                        }
                    },
                    err => {
                        // if (err == "Unauthorized") {
                        //     this.isRefreshTokenInProg = true;
                        //     this.svcAuth.RefreshToken().then((authresp: any) => {
                        //         if (!authresp.isSuccess) {
                        //             this.svcAuth.Logout();
                        //             window.location.href = "/";
                        //         }
                        //     })
                        // } else {
                            this.removeRequest(request);
                            observer.error(err);

                        //}
                        this.svcLoader.isLoading.next(false);

                    },
                    () => {
                        this.svcLoader.isLoading.next(false);
                        this.removeRequest(request);
                        observer.complete();
                    });
            // remove request from queue when cancelled
            return () => {
                this.removeRequest(request);
                subscription.unsubscribe();
            };
        });

        //return next.handle(request);
    }
}
