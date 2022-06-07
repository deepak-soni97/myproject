import { Router } from '@angular/router';
import { SvcWFManagerService, SvcTopicsService } from '@AppServices';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { WebConfig } from '@AppConfigs/WebConfig';

@Component({
  selector: 'app-my-space-page',
  templateUrl: './my-space-page.component.html',
  styleUrls: ['./my-space-page.component.scss'],

})
export class MySpacePageComponent implements OnInit {

  topicState: any = { publishedTopicsCount: 0, draftTopicsCount: 0, pendingTasksCount: 0 }
  tabIndex: number = 1;

  myContribObj: any = {
    dtSettings: {
      pagingType: 'simple_numbers',
      pageLength: 10
    }, // DataTables.Settings =
    tableData: [],
    dtTrigger: new Subject<any>()
  }
  myPendingsObj: any = {
    dtSettings: {
      pagingType: 'simple_numbers',
      pageLength: 10
    }, // DataTables.Settings =
    tableData: [],
    dtTrigger: new Subject<any>()
  }

  public selectedItems: any = ['Draft', 'Published', 'Completed', 'Rejected', 'BackToInitiator', 'Submitted', 'Deactivated']
  public selectedStatus: any = []

  public allContribData: any = []
  public allPendingData: any = []

  constructor(private router: Router, private SvcWFManagerService: SvcWFManagerService, private svcTopic: SvcTopicsService) {
    this.toggleTabs(1);
    this.topicsStatsGet();
  }
  ngOnInit() {

  }
  ngAfterViewInit() {
    //this.myContribObj.dtTrigger.next();
    //this.myPendingsObj.dtTrigger.next();
    this.getContributions();
    this.getMyPendingTasks();
  }
  getDate(date: string) {
    return new Date(date).toLocaleDateString('en-TT', {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    });
  }
  topicsStatsGet() {
    this.svcTopic.TopicsStatsGetByUserId().subscribe(row => {
      this.topicState = row;
    })
  }

  toggleTabs(tabIndexNum: number) {
    this.tabIndex = tabIndexNum;
    // if (tabIndexNum == 1) {
    //   this.getContributions();
    // }else{
    //   this.getMyPendingTasks();
    // }
  }


  getContributions() {
    this.svcTopic.TopicGetAllTopicsByUserId(1, 10000).subscribe((resp: any) => {

      this.myContribObj.tableData = resp.tasks;
      this.myContribObj.dtTrigger.next();
      this.allContribData = this.myContribObj.tableData;
    });

  }
  contribStatusSelectHandler(data: any) {
    this.myContribObj.tableData = this.allContribData.filter((d: any) => d.status === data)
  }


  routetoTopAppr(id: number, status: string) {
    if (status == WebConfig.topicStatusKey.Draft || status == WebConfig.topicStatusKey.BackToInitiator) {
      this.router.navigate([WebConfig.PagesName.ContributeTopic], { queryParams: { id: id } });
    }
    else if (status == WebConfig.topicStatusKey.Completed || status == WebConfig.topicStatusKey.Published) {
      this.router.navigate([WebConfig.PagesName.TopicDetail, id]);
    }
    else {
      this.router.navigate([WebConfig.PagesName.TopicApproval], { queryParams: { id: id } });
    }
  }


  getMyPendingTasks = async () => {
    this.SvcWFManagerService.GetMyPendingTasks(1, 1000).subscribe((data: any) => {
      this.myPendingsObj.tableData = data.tasks;
      this.myPendingsObj.dtTrigger.next();
      this.allPendingData = this.myPendingsObj.tableData;
    });
  }

  pendingStatusSelectHandler(data: any) {
    this.myPendingsObj.tableData = this.allPendingData.filter((d: any) => d.status === data)
  }


  // drop() {
  //   const filterValue = this.dropdown;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // pendingDrop() {
  //   this.allPendingTasks();
  //   const filterValue = this.pendingDropdown;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }


  // statusSelected(value: any) {
  //   this.allTask = this.allTask.filter((t: any) => t.currentstatename == value);
  // }

}
