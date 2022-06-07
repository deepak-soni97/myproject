import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard-progress-bar',
  templateUrl: './dashboard-progress-bar.component.html',
  styleUrls: ['./dashboard-progress-bar.component.scss']
})
export class DashboardProgressBarComponent{

  single: any[];
  view:  [200,200];
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  value: number = 50;
  previousValue: number = 70;
  units: string = 'counts';

  onSelect(event:any) {
    console.log(event);
  }
}
