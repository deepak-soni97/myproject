import { Component, OnInit } from '@angular/core';
import { WebConfig } from '@AppConfigs/WebConfig';

@Component({
  selector: 'app-administrator-home',
  templateUrl: './administrator-home.component.html',
  styleUrls: ['./administrator-home.component.scss']
})
export class AdministratorHomeComponent implements OnInit {
  pagesLink: any = WebConfig.PagesName;

  constructor() { }

  ngOnInit(): void {
  }

}
