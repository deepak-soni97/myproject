import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebConfig } from '@AppConfigs/WebConfig';

@Component({
  selector: 'app-recommended-topics',
  templateUrl: './recommended-topics.component.html',
  styleUrls: ['./recommended-topics.component.scss']
})
export class RecommendedTopicsComponent implements OnInit {
  webConfig: any = WebConfig;
  socialResponse: any;
  @Input() topic: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.topic) {
      this.getTopicSocialDetail();
    }
  }
  getTopicSocialDetail = () => {
    this.socialResponse = this.topic;
  }
  getCurriculumsText = (item: any) => {
    var returnVal = item.curriculum;
    let splitArr = (item.curriculum || "").split(",");
    // for (let i = 0; i < .length; i++) {
    //   returnVal +=
    //     i == splitArr - 1
    //       ? splitArr[i]
    //       : splitArr[i].Title + ", ";
    // }
    return returnVal;
  };
  getGradesText = function (item: any) {
    var returnVal = item.grades;
    // for (let i = 0; i < (item.grades || "").split(",").length; i++) {
    //   returnVal +=
    //     i == item.Grade.length - 1
    //       ? item.Grade[i].zghw
    //       : item.Grade[i].zghw + ", ";
    // }
    return returnVal;
  };
  getCoursesText = function (item: any) {
    var returnVal = item.courses;
    // for (let i = 0; i < item.courses.length; i++) {
    //   returnVal +=
    //     i == item.Course.length - 1
    //       ? item.Course[i].Title
    //       : item.Course[i].Title + ", ";
    // }
    return returnVal;
  };
  routeToDetail(topicId: number) {
    
    this.router.navigate([WebConfig.PagesName.TopicDetail, topicId]);
  }
}
