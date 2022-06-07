import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@AppConfigs/environment';
import { WebConfig } from '@AppConfigs/WebConfig';
import { SharedServiceService, SvcLocalStorageService, SvcUsersService } from '@AppServices';
import * as moment from 'moment';
@Component({
  selector: 'app-teacher-profile-view-page',
  templateUrl: './teacher-profile-view-page.component.html',
  styleUrls: ['./teacher-profile-view-page.component.css']
})
export class TeacherProfileViewPageComponent implements OnInit {
  userProfile: any;
  Title: any;
  my_expertise: any;
  about_me: any;
  teaching_Since: any;
  userObjFromToken: any;
  isEditable: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private svcUser: SvcUsersService, private svcShared: SharedServiceService, private svcLocalStorage: SvcLocalStorageService) {



  }
  editProfile() {
    this.router.navigateByUrl(WebConfig.PagesName.TeacherProfileEdit);
  }
  ngOnInit(): void {
    this.userObjFromToken = this.svcLocalStorage.GetData(environment.AuthTokenKeyLSKey);
    if (this.userObjFromToken) {

      this.userObjFromToken = JSON.parse(this.userObjFromToken);
      let userId: any = this.route.snapshot.queryParamMap.get('id');

      if (userId) {
        this.svcUser.TeacherProfileGet(userId).subscribe((row: any) => {
          if (row) {
            this.isEditable = row.username == this.userObjFromToken.username;
            this.fillUserProfile(row)
          }
        });
      } else {
        this.svcShared.getUserProfile.subscribe(row => {
          if (row.roleName.toLowerCase() == "teacher") {
            this.isEditable = true;
            this.fillUserProfile(row)

          } else {
            this.router.navigate([''])
          }
        });

      }


    }
    // this.getEmailDetail();
    // // this.getUserDetail();
    // this.getTeacherProfile();
  }

  fillUserProfile(profileObj: any) {
    this.userProfile = profileObj;
    if (profileObj.teachingsince) {
      this.teaching_Since = moment(new Date()).diff(profileObj.teachingsince, 'year');
    }
  }
  // getEmailDetail() {
  //   this.svcUser.getEmailDetail().subscribe(row => {
  //     this.row = row[0];
  //     // console.log(row);
  //     // console.log(row[0]["Email"]);
  //   });
  // }
  // getUserDetail(){
  //   this.svcTopicsService.getUserDetail().subscribe(row => {
  //     this.my_expertise = row[1].value[0].My_Experties;
  //     this.about_me = row[1].value[0].About_Me;
  //     this.teaching_Since = row[1].value[0].Teaching_Since;
  //     // console.log(row);
  //     // console.log(row[1].value[0].About_Me);
  //   });
  // }
  // getTeacherProfile(){
  //   this.svcTopicsService.UserProfileGet().subscribe(row => {
  //     console.log(row)
  //     this.row= row

  //   });
  // }
}
