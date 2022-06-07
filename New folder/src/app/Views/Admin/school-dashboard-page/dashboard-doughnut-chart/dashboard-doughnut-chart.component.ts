import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-doughnut-chart',
  templateUrl: './dashboard-doughnut-chart.component.html',
  styleUrls: ['./dashboard-doughnut-chart.component.scss']
})
export class DashboardDoughnutChartComponent {
  donutChartData = [
    {
      label: 'American',
      value: 5,
      color: '#e83e8c',
    },
    {
      label: 'British',
      value: 13,
      color: 'grey',
    },
    {
      label: 'ICSE',
      value: 5,
      color: '#fcc24f',
    },
    {
      label: 'CBSE',
      value: 5,
      color: '#6c5ce7',
    },
    {
      label: 'IBDP',
      value: 5,
      color: '#3699ff',
    },
    {
      label: 'IB MYP',
      value: 5,
      color: '#3699ff',
    },
    
  ];

}
