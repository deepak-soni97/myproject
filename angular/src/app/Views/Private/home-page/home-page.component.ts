import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SvcMasterDataService, SvcTopicSearchService, SvcTopicsService } from "@AppServices";
import { ITopicsListItemModel } from 'app/Models/ITopicsListItemModel';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  popularTopicsSlide: boolean = true
  showPopularPreloader: boolean = true
  showLatestPreloader: boolean = true
  showFeaturePreloader: boolean = true
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


    // margin:10,
    //navText: ['', ''],
    responsive: {
      0: {
        items: 1,
        slideBy: 1,
      },
      768: {
        items: 2,
        slideBy: 2,
      },
      1024: {
        items: 3,
        slideBy: 3,
      },
      1366: {
        items: 4,
        slideBy: 4,
      },
      1600: {
        items: 4,
        slideBy: 4,
      },
      1920: {
        items: 4,
        slideBy: 4,
      },
    },
    nav: true
  }
  tagsList: any = ["test", "test1"];
  constructor(private svcSearch: SvcTopicSearchService, private svcMaster: SvcMasterDataService) {
    this.getLatestTopics();
    this.getPopularTopics();
    this.getFeaturedTopics();
    this.svcMaster.MasterTagGetLatest(20).subscribe((tags: any) => {
      this.tagsList = tags.map((r: any) => r.tagName);
    })
  }

  latestTopics: any = [];
  popularTopics: any = [];
  featuredTopics: any = [];
  ngOnInit(): void {
  }

  getLatestTopics = () => {
    this.svcSearch.LatestTopicGet(20).subscribe((row: any) => {
      this.showLatestPreloader = false
      this.latestTopics = row ? row.results : [];
    })
  }
  getPopularTopics = () => {
    this.svcSearch.PopularTopicGet(20).subscribe((row: any) => {
      this.showPopularPreloader = false
      this.popularTopics = row ? row.results : [];

    })
  }
  getFeaturedTopics = () => {
    this.svcSearch.FeaturedTopicGet(20).subscribe((row: any) => {
      this.showFeaturePreloader = false;
      this.featuredTopics = row ? row.results : [];
    })
  }
}
