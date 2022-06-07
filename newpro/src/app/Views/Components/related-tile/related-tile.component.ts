import { Component, Input, OnInit } from '@angular/core';
import { WebConfig } from '@AppConfigs/WebConfig';
import { ITopicsListItemModel, ITopicViewsListItemModel } from '@AppModels';
import { SvcTopicsService } from '@AppServices';

@Component({
  selector: 'app-related-tile',
  templateUrl: './related-tile.component.html',
  styleUrls: ['./related-tile.component.scss']
})
export class RelatedTileComponent implements OnInit {
  webConfig: any = WebConfig;
  socialResponse: ITopicViewsListItemModel;
  @Input() topic: ITopicsListItemModel;

  constructor(private svcTopicsService: SvcTopicsService) { }

  ngOnInit(): void {
    if (this.topic) {
      this.getTopicSocialDetail();
    }
  }
  getTopicSocialDetail = () => {
    this.svcTopicsService.GetTopicSocialDetail(this.topic.ID).subscribe(row => {
      this.socialResponse = row;
    })
  }
  getCurriculumsText = (item: ITopicsListItemModel) => {
    var returnVal = "";
    for (let i = 0; i < item.Curriculum.length; i++) {
      returnVal +=
        i == item.Curriculum.length - 1
          ? item.Curriculum[i].Title
          : item.Curriculum[i].Title + ", ";
    }
    return returnVal;
  };
  getGradesText = function (item: ITopicsListItemModel) {
    var returnVal = "";
    for (let i = 0; i < item.Grade.length; i++) {
      returnVal +=
        i == item.Grade.length - 1
          ? item.Grade[i].zghw
          : item.Grade[i].zghw + ", ";
    }
    return returnVal;
  };
  getCoursesText = function (item: ITopicsListItemModel) {
    var returnVal = "";
    for (let i = 0; i < item.Course.length; i++) {
      returnVal +=
        i == item.Course.length - 1
          ? item.Course[i].Title
          : item.Course[i].Title + ", ";
    }
    return returnVal;
  };


}
