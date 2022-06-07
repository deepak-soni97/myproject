import { Component, OnInit } from '@angular/core';
import { multi } from './data';

@Component({
  selector: 'app-dashboard-line-chart',
  templateUrl: './dashboard-line-chart.component.html',
  styleUrls: ['./dashboard-line-chart.component.scss']
})
export class DashboardLineChartComponent  {
single: any[];
multi : any[];
view: any= [700, 300];

// options
legend: boolean = false;
showLabels: boolean = true;
animations: boolean = true;
xAxis: boolean = true;
yAxis: boolean = true;
showYAxisLabel: boolean = true;
showXAxisLabel: boolean = true;
xAxisLabel: string = '';
yAxisLabel: string = '';
timeline: boolean = true;

colorScheme = {
  domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
};

constructor() {
  Object.assign(this, { multi });
}

onSelect(data: any): void {
  console.log('Item clicked', JSON.parse(JSON.stringify(data)));
}

onActivate(data : any): void {
  console.log('Activate', JSON.parse(JSON.stringify(data)));
}

onDeactivate(data:any): void {
  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
}
}