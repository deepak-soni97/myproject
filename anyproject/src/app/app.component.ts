import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from '@AppConfigs/environment';
import { SharedServiceService,SvcAuthenticationService } from '@AppServices';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private svcAuth: SvcAuthenticationService) {
  }
  ngOnInit(): void {
  }
  @HostListener('window:unload', [ '$event' ])
    unloadHandler(event: any) {
     // this.svcAuth.Logout();
      //console.log(event);
      //alert(event);
  }
    title = 'Edupedia';
  // loadChildPage: boolean = false;
  // isLoggedOut: boolean = false;
  // constructor(private svcShared: SharedServiceService) {
  //   this.svcShared.continueChildPageGet.subscribe((row: any) => {
  //     this.loadChildPage = row;
  //   })
  //   this.svcShared.isLoggedOutGet.subscribe((row: any) => {
  //     this.isLoggedOut = row;
  //   })
  // }
 }

