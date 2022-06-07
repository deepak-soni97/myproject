import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SvcLocalStorageService, SharedServiceService, SvcUsersService, SvcAuthenticationService } from '@AppServices'
import { WebConfig } from '@AppConfigs/WebConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private svcUser: SvcUsersService, private sharedService: SharedServiceService, public router: Router, private svcAuth: SvcAuthenticationService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let roles = next.data.roles;
    return new Promise(resolve => {
      this.sharedService.continueChildPageSet(false);
      this.sharedService.isLoggedOutSet(false);
      // if (event.url == ("/" + WebConfig.PagesName.LoginPage)) {
      //   this.sharedService.isLoggedOutSet(true);
      // } else {


      this.svcUser.UserProfileGet().subscribe((data: any) => {
        this.sharedService.setUserProfile(data);
        if(roles.indexOf(data.roleName.toLowerCase())>-1){
          this.sharedService.continueChildPageSet(true);
          this.sharedService.isLoggedOutSet(false);
          resolve(true);
        }else{
          
          resolve(false);
        }
      }, err => {
        if (err == "Unauthorized" || err == "Unknown Error") {
          this.svcAuth.RefreshToken().subscribe((rfToken: any) => {
            if (!rfToken.isSuccess) {

              this.sharedService.continueChildPageSet(false);
              this.sharedService.isLoggedOutSet(true);
              this.router.navigate([WebConfig.PagesName.LoginPage]);
              resolve(false);
            } else {
              this.svcUser.UserProfileGet().subscribe((data: any) => {
                this.sharedService.setUserProfile(data);
                this.sharedService.continueChildPageSet(true);
                this.sharedService.isLoggedOutSet(false);
                resolve(true);
              })
            }
          }, err => {
            this.sharedService.continueChildPageSet(false);
            this.sharedService.isLoggedOutSet(true);
            this.router.navigate([WebConfig.PagesName.LoginPage]);
            resolve(false);
          })
        }
      })
      //}



    })






    // return new Promise(resolve => {
    //   this.svcShared.getUserProfile.subscribe(userInfo => {
    //     if (!userInfo) {
    //       this.router.navigate([WebConfig.PagesName.LoginPage])
    //       resolve(false);
    //     } else if (roles && roles.length > 0) {
    //       userInfo = JSON.parse(userInfo);
    //       // this.router.navigate([''])
    //       resolve(roles.indexOf(userInfo.roleName.toLowerCase()) > -1);
    //     } else
    //       resolve(true)
    //   });
    // })
    return true

  }
}
