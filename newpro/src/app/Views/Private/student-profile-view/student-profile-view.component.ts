import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@AppConfigs/environment';
import { WebConfig } from '@AppConfigs/WebConfig';
import { SharedServiceService, SvcLocalStorageService, SvcUsersService } from '@AppServices';


@Component({
  selector: 'app-student-profile-view',
  templateUrl: './student-profile-view.component.html',
  styleUrls: ['./student-profile-view.component.scss']
})
export class StudentProfileViewComponent implements OnInit {

  userProfile: any;
  Title: any;
  my_expertise: any;
  about_me: any;
  student_Since: any;
  userObjFromToken: any;
  isEditable: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private svcUser: SvcUsersService, private svcShared: SharedServiceService, private svcLocalStorage: SvcLocalStorageService) {



  }
  editProfile() {
    this.router.navigateByUrl(WebConfig.PagesName.StudentProfileEdit);
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
          if (row.roleName.toLowerCase() == "student") {
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
    // if (profileObj.studentsince) {
    //   this.student_Since = moment(new Date()).diff(profileObj.studentsince, 'year');
    // }
  }
  
}
