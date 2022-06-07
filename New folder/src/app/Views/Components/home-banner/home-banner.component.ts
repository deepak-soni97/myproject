import { Component, OnInit, Input } from '@angular/core';
import { WebConfig } from '@AppConfigs/WebConfig';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {
  @Input() tagsList: [];
  slides = [{ 'image': '../../assets/Images/banner.jpg' }, { 'image': '../../assets/Images/banner1.jpg' }, { 'image': '../../assets/Images/banner3.jpg' }];
  newListItem = ''
  router: any;
  constructor( private route : Router) { }

  ngOnInit(): void {
  }
  onTagClick(){
    
      let params =  this.newListItem;
    
   this.route.navigate([WebConfig.PagesName.SearchPage], { queryParams: { stext: params} });
  }
}
