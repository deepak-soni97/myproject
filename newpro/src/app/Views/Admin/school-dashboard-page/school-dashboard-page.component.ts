import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { WebConfig } from '@AppConfigs/WebConfig';
import { SvcTopicSearchService } from '@AppServices';
import * as moment from 'moment';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { BrowserModule } from '@angular/platform-browser';
import { single } from './data';

@Component({
  selector: 'app-school-dashboard-page',
  templateUrl: './school-dashboard-page.component.html',
  styleUrls: ['./school-dashboard-page.component.scss']
})
export class SchoolDashboardPageComponent {
  webConfig: any = WebConfig;

  contributionTrend: any = {
    xAxisLabel: '',
    showYAxisLabel: true,
    yAxisLabel: '',
    data: [],
    ddlSelected: { id: 0, title: "Yearly" },
    ddlChoices: [{ id: 0, title: "Yearly" }, { id: 1, title: "Monthly" }],
  };

  headers = ["Contributors", "School", "Contributions", "Email"];

  view: any = [700, 400];


  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  // Yearly: boolean;
  // Monthly: boolean;

  // colorScheme: any = {domain :['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']};

  constructor(private svcSearch: SvcTopicSearchService,private router: Router) {
    this.bindTrendingChart();
    this.bindPublishedLineData();
    this.bindSchoolwiseContribution();
    this.bindCurriculumwiseContribution();
    this.bindMostViewerContribution();
    this.bindTopContribution();
    this.bindOverallState();
  }

  onSelect(event: any) {
   }


  onTrendingChartSwitch(ev: any) {
    this.contributionTrend.ddlSelected = ev;
    this.bindTrendingChart();

  }
  bindTrendingChart() {

    if (this.contributionTrend.ddlSelected.id == 1) {
      this.svcSearch.GetContributionsCountbyMonth().subscribe((row: any) => {
        let months = moment.monthsShort();

        this.contributionTrend.data = row.map((x: any) => {
          return {
            name: months[x.publishedMonth - 1],
            value: x.count
          }
        })
      });;
    } else {
      this.svcSearch.GetContributionsCountbyYear().subscribe((row: any) => {
        this.contributionTrend.data = row.map((x: any) => {
          return {
            name: x.publishedYear.toString(),
            value: x.count
          }
        })
      });;
    }


  }

  PublishedLineData: any = [];
  bindPublishedLineData() {
    let Current = this.svcSearch.GetContributionsCountbyCurrentWeek().toPromise();
    let Previous = this.svcSearch.GetContributionsCountbyPreviousWeek().toPromise();
    Promise.all([Current, Previous]).then((data: any) => {
      let seriesData = [];
      seriesData.push({
        name: "Current Week",
        series: data[0].map((row: any) => {
          return {
            name: moment(row.publishedDay).format('ddd'),
            value: row.count
          }
        })
      })

      seriesData.push({
        name: "Previous Week",
        series: data[1].map((row: any) => {
          return {
            name: moment(row.publishedDay).format('ddd'),

            value: row.count
          }
        })
      })
      this.PublishedLineData = seriesData;
    })
  }

  SchoolContributionData: any = [];
  bindSchoolwiseContribution() {
    this.svcSearch.GetContributionsCountbySchool().subscribe(row => {
      this.SchoolContributionData = row;
    })
  }
  CurriculumwiseContributionData: any = [];
  bindCurriculumwiseContribution() {
    this.svcSearch.GetContributionsCountbyCurricula().subscribe((row: any) => {

      let contribData = row.map((item: any) => {
        return {
          name: item.title,
          value: item.count,

        }
      })

      this.CurriculumwiseContributionData = contribData;
    })
  }


  MostViewerContribution: any = [];
  bindMostViewerContribution() {
    this.svcSearch.GetMostViewedTopics().subscribe((row: any) => {

      ;
      this.MostViewerContribution = row;
    })
  }

  TopContribution: any = [];
  bindTopContribution() {
    this.svcSearch.GetContributionsCountbyUser().subscribe((row: any) => {

      ;
      this.TopContribution = row;
    })
  }

  OverallState: any = [];
  bindOverallState() {
    this.svcSearch.GetOverallTopicStats().subscribe((row: any) => {
      
      this.OverallState = row;
    })
  }

  routeToDetail(topicId: number) {
    
    this.router.navigate([WebConfig.PagesName.TopicDetail, topicId]);
  }
}