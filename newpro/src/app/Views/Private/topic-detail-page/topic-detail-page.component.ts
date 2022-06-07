import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SvcTopicsService, SvcTopicSearchService, SvcMasterDataService, SharedServiceService, DialogConfirmService } from "@AppServices";
import { WebConfig } from "@AppConfigs/WebConfig";
import { getFileviewUrlFn } from "@AppUtilities";
import { environment } from '@AppConfigs/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-topic-detail-page',
  templateUrl: './topic-detail-page.component.html',
  styleUrls: ['./topic-detail-page.component.scss']
})
export class TopicDetailPageComponent implements OnInit {
  showPopularPreloader: boolean = true
  apiUrl: string = environment.ApiEndPoint.replace("api/", "")
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    center: false,
    autoWidth: true,
    stagePadding: 10,
    margin: 10,
    items: 10,
    nav: true
  }
  vm: any = {
    Approval: {},
    model: undefined
  };

  // {
  //   curriculumIds: [],
  //   topicCurriculumn: [],
  //   topicSubject: [],
  //   bannerimageurl: '',
  //   topicLevel: '',
  //   gradeIds: [],
  // }
  _spPageContextInfo: any = {}

  _WebConfig: any = WebConfig
  model: any;
  count: number = 0;
  rating: any;
  userRatingStars: number;
  commentText = "";
  innercommentText = "";
  thirdcommentText = "";
  secondlevel = "";
  subinnercommentText = "";
  commentVal: any = [];
  cmtChilds: any = [];
  secondlevelchilds: any = [];
  finalComment: any;
  username: string = "";
  firstcom: any = [];
  secondCom: any = [];

  commentSubmissionForm: FormGroup;


  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private routeNav: Router, private svcTopic: SvcTopicsService, private svcMaster: SvcMasterDataService, private svcSearch: SvcTopicSearchService,
    private svcShared: SharedServiceService, private svcLoader: DialogConfirmService) {

  }
  userProfile: any;

  ngOnInit(): void {

    this.route.params.subscribe(routeParams => {
      //let _this: any = this.vm;
      this.vm.topicStatusKey = WebConfig.topicStatusKey;
      this.svcShared.getUserProfile.subscribe(data => {

        this.vm.profileImage = data.profilepic;
        this.userProfile = data
        this.vm.TopicId = parseInt(this.route.snapshot.paramMap.get('topicid') || "0");
        if (this.vm.TopicId > 0) {
          this.svcTopic.TopicGetById(this.vm.TopicId).subscribe((itemRes: any) => {
            if (!itemRes) {
              window.location.href = "/";
              //return false;
            } else {
              this.vm.model = itemRes;
              this.EnableEditMode();
              this.svcTopic.TopicViewed(this.vm.TopicId).subscribe((res: any) => { });

              this.loadExistingAttachment();
              this.topicSocialDetailGet();
              this.GetTeacherTopics();
              this.GetRelatedTopics(false);
              this.GetRelatedTopics(true);
            }
          })

        } else {
          this.routeNav.navigate(['/home']);

        }
      })




    });


  }


  loadExistingAttachment() {
    this.svcTopic.TopicAttachmentsGetByTopic(this.vm.TopicId).subscribe((row) => {
      this.vm.model.TopicAttachments = row;
    })
  }
  async topicSocialDetailGet() {

    this.svcTopic.TopicGetStats(this.vm.TopicId).subscribe((Socialdata: any) => {
      this.vm.viewCount = ((Socialdata?.totalViews) || 0);
      this.vm.commentCount = Socialdata.totalComments;
      this.vm.likeCount = Socialdata.totalLikes;
      this.vm.shareCount = 0;
      this.vm.ratingCount = Socialdata.totalRatingCount;
      this.vm.averageRating = Socialdata.averageRating;
      this.vm.socialItemId = Socialdata.topicId;
      this.TopicRateGetForUser();
      this.TopicLikeCheckForUser();
      this.TopicSaveCheckForUser();
    })

  }

  TopicLikeCheckForUser() {
    this.svcTopic.TopicLikeCheckForUser(this.vm.TopicId).subscribe(data => {
      this.vm.liked = data;
    })
  }



  TopicSaveCheckForUser() {
    this.svcTopic.TopicSaveCheckForUser(this.vm.TopicId).subscribe(data => {
      this.vm.favorite = data;
    })
  }
  ngAfterViewInit(): void {
    this.TopicRateGetForUser();
  }

  userTopicObj: any;
  setRating(e: any) {
    const formdata = new FormData();
    formdata.append('ratingValue', e.toString());
    formdata.append('topicId', this.vm.TopicId);
    this.svcTopic.TopicRate(formdata).subscribe(res => {
      //  this.TopicRateGetForUser();
      this.topicSocialDetailGet();
    })
  }
  TopicRateGetForUser() {
    this.svcTopic.TopicRateGetForUser(this.vm.TopicId).subscribe((data: any) => {
     debugger;
      if (data) {
        this.userTopicObj = data;
        this.userRatingStars = data.ratingvalue;
      } else {
        this.userRatingStars = 0;
      }
    });
  }
  EnableEditMode = async () => {
    // let SchoolApprovers: any = await this.svcMaster.GetSchoolLevelApprovers().toPromise();
    // let SchoolApproversEmail: any = [];
    // SchoolApprovers[0].Approvers.forEach((value: any) => {
    //   SchoolApproversEmail.push(value.EMail);
    // });
    // this.vm.model.Curriculum.forEach(async (val: any) => {

    //   let CurrApprovers = await this.svcMaster.GetCurriculumLevelApprovers(val.ID).toPromise();
    //   CurrApprovers.forEach((value: any) => {
    //     value.Approvers.map((x: any) =>
    //       SchoolApproversEmail.push(x.EMail)
    //     );
    //   });

    // });

    if ((this.vm.model.status == WebConfig.topicStatusKey.Published || this.vm.model.status == WebConfig.topicStatusKey.Deactivated) && this.vm.model.createdbyuserid == this.userProfile.userid) {
      this.vm.EnableActivation = true;
      this.vm.EditableUrl = "/" + WebConfig.PagesName.ContributeTopic + "?id=" + this.vm.TopicId;
    } else {
      this.vm.EditableUrl = "/" + WebConfig.PagesName.ContributeTopic + "?copy=true&id=" + this.vm.TopicId;

    }

    // if ((this.vm.model.TopicRequestStatus.ID == this.vm.configValues.publishID || this.vm.model.TopicRequestStatus.ID == this.vm.configValues.deactivatedID)
    //   && this.vm.model.Author.EMail == "_spPageContextInfo.userEmail") {
    //   this.vm.EnableEdit = true;

    //   this.vm.EditableUrl = "https://gemsedu.sharepoint.com/sites/Edupedia-QA/Pages/Contribute-Topic.aspx?topicid=" + this.vm.model.ID;
    //   var itemPromise: any = await this.svcTopic.getTopicItembyParentID(this.vm.model.ID).toPromise();
    //   if (itemPromise) {

    //     if (itemPromise.TopicRequestStatus.ID == this.vm.configValues.draftID) {
    //       this.vm.EnableEdit = true;
    //       this.vm.EditableUrl = "https://gemsedu.sharepoint.com/sites/Edupedia-QA/Pages/Contribute-Topic.aspx?topicid=" + itemPromise.ID;

    //     } else
    //       this.vm.EnableEdit = false;

    //   }

    // } else if (WebConfig.isTeacher && this.vm.model.TopicRequestStatus.ID == this.vm.configValues.publishID) {
    //   this.vm.EnableCopy = true;
    //   this.vm.EditableUrl = "https://gemsedu.sharepoint.com/sites/Edupedia-QA/Pages/Contribute-Topic.aspx?topicid=" + this.vm.model.ID;

    // } else {
    //   window.location.href = "https://gemsedu.sharepoint.com/sites/Edupedia";
    // }
  }

  viewProfile = (userid: number) => {
    this.routeNav.navigate([WebConfig.PagesName.TeacherProfile, userid])
  }

  CompletionDurationText() {
    var retText = "";
    if (this.vm.model) {
      if (this.vm.model.completionDuration && this.vm.model.completionDuration > 0) {
        let hourSplit = parseFloat(this.vm.model.completionDuration).toFixed(2).toString().split(".")[0];
        let minuteSplit = parseFloat(this.vm.model.completionDuration).toFixed(2).toString().split(".")[1];
        let completionDuration = [hourSplit, minuteSplit];
        retText = " | " + (completionDuration[0] == "0" ? "" : (completionDuration[0] == "1" ? "0" + completionDuration[0] + " Hr " :
          (completionDuration[0].length == 1 ? "0" + completionDuration[0] + " Hrs " : completionDuration[0] + " Hrs "))) +
          ((completionDuration[1] == undefined || completionDuration[1] == "0") ? "" :
            (completionDuration[1].length == 1 ? completionDuration[1] + "0 Mins " : completionDuration[1] + " Mins "))

      }

    }
    return retText;
  }
  getDate(date: any) {
    return new Date(date).toLocaleDateString('en-TT', {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    });
  }


  async ToggleActivateStatus() {

    this.svcTopic.TopicsToggleActiveStatus(this.vm.TopicId).subscribe(x => {
      debugger;
      window.location.href = window.location.href;
    })
  }

  likeTopic() {
    let request;
    if (!this.vm.liked) {
      request = this.svcTopic.TopicLike(this.vm.TopicId);
    } else {
      request = this.svcTopic.TopicDislike(this.vm.TopicId);
    }
    request.subscribe(data => {
      this.topicSocialDetailGet();


    })
  }


  favoriteThisTopic() {
    let request;
    if (!this.vm.favorite) {
      request = this.svcTopic.TopicSave(this.vm.TopicId);
    } else {
      request = this.svcTopic.TopicUnSave(this.vm.TopicId);
    }
    request.subscribe(data => {
      this.topicSocialDetailGet();
    })
  }

  getThumbnail = (file: any) => {
    file.thumbnail = file.ServerRelativeUrl
    file.isimage = true;
  }
  GetFileviewUrl = function (file: any) {
    return getFileviewUrlFn(file);
  }
  openVideo = (att: any) => {
    let _this = this;
    this.vm.currentVideosrc = getFileviewUrlFn(att.File);//att.File.ServerRelativeUrl;
    this.vm.currentVideosrctype = "video/" + att.File.ServerRelativeUrl.split('.').pop();
    setTimeout(function () {
      _this.vm.showVideo = true;

      $(".Viewer").slideDown();
      var myElement: any = document.getElementById("Viewer");
      var topPos = myElement.offsetTop - 10;
      $('html, body').animate({ scrollTop: topPos }, 1000);
    }, 100)
  }
  closeVideo = (att: any) => {
    let _this = this;
    $(".Viewer").slideUp();

    var myElement: any = document.getElementById("topic-resources");
    var topPos = myElement.offsetTop - 10;
    $('html, body').animate({ scrollTop: topPos }, 1000);

    setTimeout(function () {
      _this.vm.showVideo = false;
    }, 1000)
  }

  getExtContentURL = (url: any) => {
    if (url.indexOf("https://www.youtube.com") > -1) {
      var id = url.split('v=')[1];
      url = "https://www.youtube-nocookie.com/embed/" + id;
    }
    return url;
  }

  DownloadAllAttachmentAsZip = () => {

  }
  TeacherTopicsList: any;
  GetTeacherTopics = () => {
    this.svcSearch.GetTeacherTopics(this.vm.model.createdbyuserid, 4,this.vm.model.id).subscribe((item: any) => {
      this.showPopularPreloader = false
      this.TeacherTopicsList = item;
    })
  }

  relatedTopicsList: any;
  recommandedTopicList: any;
  GetRelatedTopics = (isonlyFeatured:boolean) => {
    const formdata = new FormData();
    (this.vm.model.curriculumIds || []).map((row: any, idx: number) => {
      formdata.append(`Curriculum[${idx}]`, row)
    });
    (this.vm.model.gradeIds || []).map((row: any, idx: number) => {
      formdata.append(`Grades[${idx}]`, row)
    })
    if (this.vm.model.subjectId) {
      formdata.append(`Subject[0]`, this.vm.model.subjectId)
    }
    (this.vm.model.courseIds || []).map((row: any, idx: number) => {
      formdata.append(`Courses[${idx}]`, row)
    })
    if (this.vm.model.tags) {
      (this.vm.model.tags || []).map((row: any, idx: number) => {
        formdata.append(`Tags[${idx}]`, row)
      })
    }
    if(isonlyFeatured){
      formdata.append(`IsFeatured`, isonlyFeatured.toString())
    }
    formdata.append(`ExcludedTopicIds[0]`, this.vm.model.id)    
    this.svcSearch.FindRelatedTopics(formdata).subscribe(row => {
      if(isonlyFeatured){
        this.recommandedTopicList=row
      }
      else{
        this.relatedTopicsList = row;
      }      
    });
  }
 
  gotoTopicDetail = (topicId: any) => {
    this.routeNav.navigate([this._WebConfig.PagesName.TopicDetail, topicId]);
  }
  onTagClick(item: string) {
    this.routeNav.navigate([WebConfig.PagesName.SearchPage], { queryParams: { stext: item } });
  }
  createdbyuserfullname(item: string) {
    this.routeNav.navigate([WebConfig.PagesName.TeacherProfile], { queryParams: { id: item } });

  }

  isInnerOpen: boolean = false;
  isFirstComment: boolean[] = [];
  //  issecondComment:boolean[][] = [];
  sChildComment: boolean[] = [];
  toggleFirstReply(i: number, j: number) {
    //  this.issecondComment[i][j] =  true
    this.sChildComment[i] = !this.sChildComment[i];
  }
  selectedFileForViewer: any = '';
  viewAttachmentClick(att: any) {
    let url: any = att.fileurl.split("/");
    this.selectedFileForViewer = url[url.length - 1];

  }
  closeViewer() {
    this.selectedFileForViewer = "";
  }
  // searchTopic() {
  //   debugger;
  //   const formValues = this.searchForm.value;
  //   const formdata = new FormData();
  //   formValues.Curriculums.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
  //     formdata.append(`Curriculum[${idx}]`, r.curriculummasterid.toString())
  //   })
  //   formValues.GradesGroup.map((g: any) => {
  //     g.gradesList.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
  //       formdata.append(`Grades[${idx}]`, r.masterGradeId.toString())
  //     })
  //   })
  //   formValues.SubjectsGroup.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
  //     formdata.append(`Courses[${idx}]`, r.id.toString())
  //   })
  //   formValues.LevelGroup.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
  //     formdata.append(`TopicLevel[${idx}]`, r.id.toString())
  //   })
  //   formValues.ContributorGroup.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
  //     formdata.append(`Contributors[${idx}]`, r.userId.toString())
  //   })
  //   formValues.ContributorSchoolGroup.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
  //     formdata.append(`ContributorSchools[${idx}]`, r.id.toString())
  //   })
  //   formdata.append(`FromAverageRating`, this.minRating.toString());
  //   formdata.append(`ToAverageRating`, this.maxRating.toString());

  //   formdata.append(`FromDuration`, this.minDuration.toString());
  //   formdata.append(`ToDuration`, this.maxDuration.toString());

  //   formdata.append("SearchText", formValues.SearchText);
  //   formdata.append("PageRowsLimit", "10")
  //   formdata.append("OrderByField", formValues.OrderByField)
  //   formdata.append("OrderDirection", "Ascending")

  //   this.svcSearch.SearchTopic(formdata).subscribe(row => {
  //     ;
  //     this.searchResponse = row;
  //   });

  // }

}
