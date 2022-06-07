import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { WebConfig } from '@AppConfigs/WebConfig';
import { SharedServiceService, SvcAuthenticationService, SvcLocalStorageService, SvcUsersService } from '@AppServices';

@Component({
  selector: 'app-token-validation',
  templateUrl: './token-validation.component.html',
  styleUrls: ['./token-validation.component.scss']
})
export class TokenValidationComponent implements OnInit {

  constructor(public router: Router, private svcUser: SvcUsersService,
    private sharedService: SharedServiceService, private svcAuth: SvcAuthenticationService) {
    // this.router.events.subscribe((event) => {
    //   console.log(event)
    //   if (event instanceof NavigationEnd) {
    //     this.sharedService.continueChildPageSet(false);
    //     this.sharedService.isLoggedOutSet(false);
    //     if (event.url == ("/" + WebConfig.PagesName.LoginPage)) {
    //       this.sharedService.isLoggedOutSet(true);
    //     } else {
    //       this.svcUser.UserProfileGet().subscribe((data: any) => {
    //         this.sharedService.setUserProfile(data);
    //         this.sharedService.continueChildPageSet(true);
    //         this.sharedService.isLoggedOutSet(false);

    //       }, err => {
    //         if (err == "Unauthorized") {
    //           //geet refresh token
    //           this.svcAuth.RefreshToken().subscribe((rfToken: any) => {
    //             if (!rfToken.isSuccess) {
    //               this.sharedService.continueChildPageSet(false);
    //               this.sharedService.isLoggedOutSet(true);
    //               this.router.navigate([WebConfig.PagesName.LoginPage]);
    //             }
    //           }, err => {
    //             this.sharedService.continueChildPageSet(false);
    //             this.sharedService.isLoggedOutSet(true);
    //             this.router.navigate([WebConfig.PagesName.LoginPage]);
    //           })
    //         }
    //       })
    //     }
    //     console.log("Navigation start")



    //   }
    // });

  }

  ngOnInit(): void {

  }

}
