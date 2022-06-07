import { Component, OnInit , NgModule } from '@angular/core';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { BrowserModule } from '@angular/platform-browser';
import { single } from './data';

@Component({
  selector: 'app-school-dashboard-page',
  templateUrl: './school-dashboard-page.component.html',
  styleUrls: ['./school-dashboard-page.component.scss']
})
export class SchoolDashboardPageComponent{

  headers = ["Contributors","School","Contributions","Email"];

  rows = [
    {
    "Contributors": "Sutharsan Parthasaarathy",
     "School" :"Phoenix Virtual School	",
     "Contributions":"1",
     "Email": "Sutharsan.p@Gemseducation.com"
  },
    {
    "Contributors": "Hema Fernandes",
     "School" :"The Winchester School - Jebel Ali	",
     "Contributions":"1",
     "Email": "a@gmail.com"
  }
];

  selection =["Yearly"];
  single: any[];
  multi: any[];

  view:any =  [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'From 2011-2012';
  showYAxisLabel = true;
  yAxisLabel = '';
  
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  // Yearly: boolean;
  // Monthly: boolean;

// colorScheme: any = {domain :['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']};
  
  constructor() {
    Object.assign(this, { single });
    console.log(this.single);
  }

  onSelect(event : any) {
    //console.log(event);
  }

  PrepareTrendingChartData(ev : any){
     this.selection = ev.target.dataset.value
  //  console.log(this.selection = ev.target.dataset.value);
  }

}