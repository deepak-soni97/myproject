import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '@AppServices';

@Component({
  selector: 'app-private-template',
  templateUrl: './private-template.component.html',
  styleUrls: ['./private-template.component.scss']
})
export class PrivateTemplateComponent implements OnInit {

  loadChildPage: boolean = false;

  constructor(private svcShared: SharedServiceService) {
    this.svcShared.continueChildPageGet.subscribe((row: any) => {
      this.loadChildPage = row;
    })
  }
  ngOnInit(): void {
  }

}
