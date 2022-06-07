import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { environment } from '@AppConfigs/environment';
import { WebConfig } from '@AppConfigs/WebConfig';
import { SharedServiceService, SvcUsersService, SvcLocalStorageService, SvcAuthenticationService } from '@AppServices';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // userObj: any;
  pagesLink: any = WebConfig.PagesName;
  isSignOut: boolean;
  userProfile: any = null;
  isTeacher: boolean = false;


  constructor(private svcLocalStorage: SvcLocalStorageService, public router: Router, private svcUser: SvcUsersService,
    private sharedService: SharedServiceService, private svcAuth: SvcAuthenticationService) {

    this.sharedService.isLoggedOutGet.subscribe(row => this.isSignOut = row);
  }

  ngOnInit(): void {
    this.sharedService.getUserProfile.subscribe(row => {
      this.userProfile = row;
      this.isTeacher = (row?.roleName) == "Teacher";
    });
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: any) {
    this.showPopup(2, event);
    event.stopPropagation()
  }
  isShown: boolean = false;
  showPopup(id: number, event: any) {
    if (id == 1) {
      this.isShown = true;
      event.stopPropagation()
    } else {
      this.isShown = false;
    }
  }

  onSignOut() {
    this.svcAuth.Logout();
  }
  onProfileClick() {
    if (this.userProfile.roleName.toLowerCase() == "teacher") {
      window.location.href = this.pagesLink.TeacherProfile;
    } else {
      window.location.href = this.pagesLink.StudentProfile
    }
  }
}
