import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebConfig } from '@AppConfigs/WebConfig';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-tag-container',
  templateUrl: './home-tag-container.component.html',
  styleUrls: ['./home-tag-container.component.scss']
})

export class HomeTagContainerComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    center: false,
    autoWidth: true,
    stagePadding:10,
    margin:10,
    items : 10
}
  @Input() tagsList: [];
  
  constructor(private router: Router) { }
  ngOnInit(): void {

  }
  onTagClick(tag:string){
    this.router.navigate([WebConfig.PagesName.SearchPage], { queryParams: { stext: tag } });
  }


}
