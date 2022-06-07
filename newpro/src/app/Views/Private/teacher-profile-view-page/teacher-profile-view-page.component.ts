import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@AppConfigs/environment';
import { WebConfig } from '@AppConfigs/WebConfig';
import { SharedServiceService, SvcLocalStorageService, SvcTopicSearchService, SvcUsersService } from '@AppServices';
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
  constructor(private route: ActivatedRoute, private router: Router, private svcUser: SvcUsersService, private svcShared: SharedServiceService, private svcLocalStorage: SvcLocalStorageService,
    private svcSearch: SvcTopicSearchService) {



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
    this.searchTopic();
    if (profileObj.teachingsince) {
      this.teaching_Since = moment(new Date()).diff(profileObj.teachingsince, 'year');
    }
  }
  // getEmailDetail() {
  //   this.svcUser.getEmailDetail().subscribe(row => {
  //     this.row = row[0];
  //     // ;
  //   });
  // }
  // getUserDetail(){
  //   this.svcTopicsService.getUserDetail().subscribe(row => {
  //     this.my_expertise = row[1].value[0].My_Experties;
  //     this.about_me = row[1].value[0].About_Me;
  //     this.teaching_Since = row[1].value[0].Teaching_Since;
  //     // ;
  //   });
  // }
  // getTeacherProfile(){
  //   this.svcTopicsService.UserProfileGet().subscribe(row => {
  //     
  //     this.row= row

  //   });
  // }
  pagesCount: number = 1;
  activePage: number = 1;
  pageRows = 6;
  searchResponse: any;
  searchTopic() {
    const formdata = new FormData();
    formdata.append(`Contributors[0]`, this.userProfile.userid)
    formdata.append("OrderByField", 'PublishedDate')
    formdata.append("OrderDirection", "Descending")
    formdata.append("PageNumber", this.activePage.toString());
    formdata.append("PageRowsLimit", this.pageRows.toString())
    this.svcSearch.SearchTopic(formdata).subscribe((row: any) => {
      if (row.pageRows == this.pageRows || (row.pageNumber == 1 && row.pageRows < this.pageRows)) {
        let pageCountNum = parseInt((row.totalRows / row.pageRows).toString()) + (parseInt((row.totalRows % row.pageRows).toString()) > 0 ? 1 : 0)
        this.pagesCount = isNaN(pageCountNum) ? 1 : pageCountNum;
      } else if (row.totalRows == 0) {
        this.pagesCount = 1;
      }
      this.searchResponse = row;
    });
  }

  pageNumClick(index: number) {
    this.activePage = index + 1;
    this.searchTopic();
  }
  onNextPrevClick(isNext: boolean) {
    if (isNext) {
      this.activePage = this.activePage + 1;
    }
    else
      this.activePage = this.activePage - 1;
    this.searchTopic();
  }

}
