import { Component, OnInit } from '@angular/core';
import grades from './_files/catalog.json';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
   public isCollapsed = false;
   public gradeList = grades;
   public isLoaded="";
   public show:boolean = false;
   public bt:any = 'Show';
   
  constructor() {
    // this.bt = "false"
   }
   
   onClick(){
    this.show = !this.show;
    if(this.show)  
      this.bt = "Hide";
    else
      this.bt = "Show";
  }
  ngOnInit(): void {
  }

}
