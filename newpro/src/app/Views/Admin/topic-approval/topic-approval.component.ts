import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SvcTopicsService, SvcUsersService } from '@AppServices';
import { ViewportScroller } from '@angular/common';
// import { Observable, BehaviorSubject, Subject } from 'rxjs';
// import { formatDate } from '@angular/common';
import { SvcCurriculumsService, SvcLocalStorageService } from '@AppServices';


import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@AppConfigs/environment';
import { SvcWFManagerService } from 'app/Services/svc-wfmanager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebConfig } from '@AppConfigs/WebConfig';
@Component({
  selector: 'app-topic-approval',
  templateUrl: './topic-approval.component.html',
  styleUrls: ['./topic-approval.component.scss']
})
export class TopicApprovalComponent implements OnInit {
  apiUrl: string = environment.ApiEndPoint.replace("api/", "")
  wfApprovalHistory: any = [];
  datepickerShow: boolean = false;
  results: any = [];
  result: any;
  data: any = []
  curriculam: any;
  today = new Date();
  jstoday: any
  historyShowAll: boolean = false;
  paramsObject: any;
  profileObj: any;
  WfData: any;
  checkoutUser: any;
  topicName: any;
  finalWfData: any;

  isCheckoutBySameUser = false;
  actionsList: any;
  commentForm: FormGroup;
  constructor(
    private SvcTopicsService: SvcTopicsService,
    private http: HttpClient,
    private ViewportScroller: ViewportScroller,
    private route: ActivatedRoute, private svcLocalStorage: SvcLocalStorageService,
    private svcWfManager: SvcWFManagerService,
    private svcUser: SvcUsersService,
    private router: Router,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {

    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.svcUser.UserProfileGet().subscribe((profile: any) => {
        this.profileObj = profile;
        this.route.queryParamMap
          .subscribe((params: any) => {
            this.paramsObject = { ...params.params };
            this.getTopics();
            this.commentForm = this.fb.group({
              comments: [''],
              isFeatured: [false],
              featuredTill: ['']
            });
          }
          );
      })

      let userObj = this.svcLocalStorage.GetData(environment.AuthTokenKeyLSKey);
      //this.username = userObj ? `${(JSON.parse(userObj).username)}` : "";      
    } else {
      this.router.navigate([WebConfig.PagesName.TeacherDashboard])
    }
  }
  isApprover: boolean = false;
  getCheckout = async (id: number) => {
    this.svcWfManager.GetWFTaskPendingByWFInstanceID(id).subscribe((data: any) => {
      if (data.length > 0) {
        this.WfData = data;
        this.finalWfData = this.WfData[0];
        this.isApprover = this.finalWfData.assignedtoWFRoleUers.filter((x: any) => x.userid == this.profileObj.userid).length > 0

        if (this.isApprover) {
          if (this.finalWfData.ischeckedout && this.finalWfData.ischeckedoutby == this.profileObj.userid) {
            this.isCheckoutBySameUser = true;

            this.svcWfManager.GetActionsforWFState(this.finalWfData.currentstateid).subscribe((actions: any) => {
              this.actionsList = actions;
            })
          }
        }

      }
    })


    this.svcWfManager.GetCompletedWFTaskByWFInstanceID(id).subscribe((wfHistory: any) => {
      this.wfApprovalHistory = wfHistory;
    })

  }

  getTopics = async () => {
    await this.SvcTopicsService.TopicGetById(this.paramsObject.id).subscribe((data: any) => {
      if (data) {
        this.result = data;
        if (this.result.status != "Draft" && this.result.status != "Completed") {

          if (data.completionDuration && data.completionDuration > 0) {

            let hourSplit = parseFloat(data.completionDuration).toFixed(2).toString().split(".")[0];
            let minuteSplit = parseFloat(data.completionDuration).toFixed(2).toString().split(".")[1];
            this.result.completionDuration = hourSplit + " Hours " + minuteSplit + " Minutes";
          }
          this.commentForm.patchValue({
            //comments: [''],
            isFeatured: data.isFeatured || false,
            featuredTill: data.featuredTill || ''
          });

          this.getCheckout(this.result.wfInstanceId);
          this.loadExistingAttachment();
        } else
          this.router.navigate(['my-dashboard']);
      } else
        this.router.navigate(['my-dashboard']);
    })
  }
  ExistingTopicAttachments: any = [];
  loadExistingAttachment() {
    this.SvcTopicsService.TopicAttachmentsGetByTopic(this.result.id).subscribe((row) => {
      this.ExistingTopicAttachments = row;
    })
  }
  // getTopicId= async() =>{
  //  await this.SvcTopicsService.TopicGetById(77).subscribe(data => {
  //     this.data.push(data);
  //     this.results = data;
  //     this.jstoday = formatDate(this.today, 'dd-MMM-yyyy hh:mm  a', 'en-US', '+0530');
  //     this.results.createdon = this.jstoday 
  //   })
  // }


  public onClick(elementId: string): void {
    this.ViewportScroller.scrollToAnchor(elementId);
  }

  CheckOutTask(id: number) {
    this.svcWfManager.CheckOutTask(id).subscribe();
    this.getTopics();
    //this.GetMyPendingTasks();
  }

  // GetMyPendingTasks() {
  //   this.svcWfManager.GetMyPendingTasks();
  // }

  DiscardCheckOutTask(id: number) {
    this.svcWfManager.DiscardCheckOutTask(id).subscribe();
    this.getTopics();
  }


  get isFeaturedField(): any {

    return this.commentForm.get("isFeatured")?.value;
  }
  onActionTaken(actionsID: number) {
    let val = this.commentForm.value;
    if (val.featuredTill) {
      try {
        val.featuredTill = val.featuredTill.toISOString();

      } catch (e) {
        val.featuredTill = val.featuredTill;

      }
    }
    this.SvcTopicsService.SubmitTopicTask(this.result.id, this.finalWfData.id, actionsID, this.commentForm.value).subscribe(data => {
      this.router.navigate(['my-dashboard'])

    })
  }
  showAllApprovalHistory() {
    this.historyShowAll = true;
  }

}
