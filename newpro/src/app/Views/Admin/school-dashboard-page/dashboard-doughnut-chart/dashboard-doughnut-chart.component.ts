import { Component, Input, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard-doughnut-chart',
  templateUrl: './dashboard-doughnut-chart.component.html',
  styleUrls: ['./dashboard-doughnut-chart.component.scss']
})
export class DashboardDoughnutChartComponent {
  @Input() donutChartData: any = [];
  view: [1000,500];

  legendPosition = LegendPosition.Below;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {

  }
}
