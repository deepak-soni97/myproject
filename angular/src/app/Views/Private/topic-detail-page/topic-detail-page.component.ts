import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISPListBaseModel, ITopicDetailModel } from '@AppModels';
import { SvcTopicsService, SvcTopicSearchService, SvcMasterDataService, SharedServiceService } from "@AppServices";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { WebConfig } from "@AppConfigs/WebConfig";
import { getFileTypeFn, getFileviewUrlFn } from "@AppUtilities";
import { data } from 'jquery';
import { environment } from '@AppConfigs/environment';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-topic-detail-page',
  templateUrl: './topic-detail-page.component.html',
  styleUrls: ['./topic-detail-page.component.scss']
})
export class TopicDetailPageComponent implements OnInit {
  view = false;
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
    autoWidth: false,
    stagePadding: 64,
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
  userRatingStars: any = 0;
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
    private svcShared: SharedServiceService) {


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
              this.GetRelatedTopics();
              this.GetRecommendedTopics();



              //this.vm.Approval.isfeatured = this.vm.model.IsFeatured;

              //   if (this.vm.model.FeaturedTill && this.vm.model.FeaturedTill.length > 10) {
              //     var date = new Date(this.vm.model.FeaturedTill).toLocaleDateString('en-TT', {
              //       year: "numeric",
              //       month: "numeric",
              //       day: "numeric"
              //     }).replace("/", "-");
              //     //$("#datepicker").val(date);
              //   }
              //   if (this.vm.model.TopicRequestStatus.ID === this.vm.configValues.schoollevelapprovalID) {
              //     var schoolApproversPromise = this.svcMaster.GetSchoolLevelApprovers();
              //     schoolApproversPromise.subscribe((approversRes: any) => {
              //       this.vm.currentApprovers = approversRes[0].Approvers;
              //       for (let i = 0; i < approversRes[0].Approvers.length; i++) {
              //         if (approversRes[0].Approvers[i].EMail.toLowerCase() === this._spPageContextInfo.userEmail.toLowerCase()) {
              //           this.vm.isApprover = true;
              //           break;
              //         }
              //       }
              //     });
              //   }
              //   else {
              //     var defaultStatusIds = [this.vm.configValues.draftID, this.vm.configValues.schoollevelapprovalID, this.vm.configValues.assignbacktoContributorID, this.vm.configValues.rejectID,
              //     this.vm.configValues.publishID, this.vm.configValues.deactivatedID]
              //     if (defaultStatusIds.indexOf(this.vm.model.TopicRequestStatus.ID) < 0) {
              //       var curriculumbyStatusIDPromise = this.svcMaster.GetCurriculumsByRequestStatusID(this.vm.model.TopicRequestStatus.ID);
              //       curriculumbyStatusIDPromise.subscribe((curRes: ISPListBaseModel[]) => {
              //         var curriculumApproversPromise = this.svcMaster.GetCurriculumLevelApprovers(curRes[0].ID);
              //         curriculumApproversPromise.subscribe((approversRes: any) => {
              //           this.vm.currentApprovers = approversRes[0].Approvers;
              //           for (let i = 0; i < approversRes[0].Approvers.length; i++) {
              //             if (approversRes[0].Approvers[i].EMail.toLowerCase() === this._spPageContextInfo.userEmail.toLowerCase()) {
              //               this.vm.isApprover = true;
              //               // setTimeout(function () {
              //               //   $scope.$apply();
              //               //   edusp.ShowLoader(false);
              //               // }, 500)
              //               break;
              //             }
              //           }
              //         });
              //       });
              //     }
              //   }



              //   var normalttachmentsPromise = this.svcTopic.getTopicAttachments(itemRes.ID, "SharedDocRepo").subscribe(Att => {
              //     this.vm.normalAttachments = Att;
              //   });
              //   var restrictedachmentsPromise = this.svcTopic.getTopicAttachments(itemRes.ID, "SharedDownloadRestrictedDocRepo").subscribe(Att => {
              //     this.vm.restrictedAttachments = Att;
              //   });
              //   var topicHistoryPromise = this.svcTopic.getTopicHistory(itemRes.ID).subscribe(res => {
              //     this.vm.model.history = res;
              //   });
              //   this.vm.model.TopicAttachments = [];

              //   this.vm.normalAttachments.forEach((att: any) => {
              //     att.isDownloadable = true;
              //     var fileextension = att.File.Name.split('.').pop();
              //     att.fileType = getFileTypeFn(fileextension);
              //     if (att.DocType == "BannerImage") {
              //       this.vm.model.bannerImage = att;
              //     }
              //     else {
              //       this.vm.model.TopicAttachments.push(att);
              //     }
              //   });
              //   this.vm.restrictedAttachments.forEach((att: any) => {
              //     var fileextension = att.File.Name.split('.').pop();
              //     att.fileType = getFileTypeFn(fileextension);
              //     att.isDownloadable = false;
              //     this.vm.model.TopicAttachments.push(att);

              //   });
              //   // $(".attachment-spinner").fadeOut(200);
              //   // if (vm.socialItemId) {
              //   //   edusp.updateSocialItem(vm.socialItemId,
              //   //     {
              //   //       viewCount: vm.viewCount,
              //   //       likeCount: vm.likeCount,
              //   //       //commentCount:vm.commentCount,
              //   //       saveCount: vm.favoriteCount,
              //   //       rating: {
              //   //         count: vm.ratingCount,
              //   //         averageValue: vm.averageRating
              //   //       }
              //   //     });
              //   // }
              //   this.vm.ShowDownloadZip = this.vm.model.TopicAttachments.filter((x: any) => x.isDownloadable).length > 0;
              //   // $('[data-toggle="tooltip"]').tooltip();
              //   // $('#lightgallery').lightGallery({
              //   //   selector: '.galleryImg',
              //   //   share: false
              //   // });



              //   // vm.PeoplePickerInit('peoplePickerOffice365Div');
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
      if (data) {
        this.userTopicObj = data;
        this.userRatingStars = data.ratingvalue;
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
    this.svcSearch.GetTeacherTopics(this.vm.model.createdbyuserid, 5).subscribe((item: any) => {
      console.log("teacher Topics", item)
      this.showPopularPreloader = false
      this.TeacherTopicsList = item;
    })
  }

  relatedTopicsList: any;
  GetRelatedTopics = () => {

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
    this.svcSearch.RelatedTopicsGet(formdata).subscribe(row => {
      console.log("relatedTopicsList", row);
      this.relatedTopicsList = row;
    });
  }
  recommandedTopicList: any;
  GetRecommendedTopics = () => {
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
    this.svcSearch.RecommandedTopicsGet(formdata).subscribe(row => {
      console.log("recommandedTopicList", row);
      this.recommandedTopicList = row;
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
    console.log(i, j)
    //  this.issecondComment[i][j] =  true
    this.sChildComment[i] = !this.sChildComment[i];
  }

  // searchTopic() {
  //   debugger;
  //   const formValues = this.searchForm.value;
  //   console.log(formValues, this.minRating, this.maxRating);
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
  //     console.log(row);
  //     this.searchResponse = row;
  //   });

  // }
  selectedAttachment:any="";
  onFilenameclick(att:any){
  this.selectedAttachment = att
  console.log();
  // getFilePreviewUrl(att.filename);
  this.view=true

  }
  closeHandler(){
    this.view = false
  }
}
