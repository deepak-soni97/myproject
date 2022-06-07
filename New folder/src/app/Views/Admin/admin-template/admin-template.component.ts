import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '@AppServices';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.scss']
})
export class AdminTemplateComponent implements OnInit {

  loadChildPage: boolean = false;

  constructor(private svcShared: SharedServiceService) {
    this.svcShared.continueChildPageGet.subscribe((row: any) => {
      this.loadChildPage = row;
    })
  }


  ngOnInit(): void {
  }

}
