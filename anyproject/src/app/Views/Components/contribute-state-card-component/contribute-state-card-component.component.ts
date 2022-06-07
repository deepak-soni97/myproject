import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contribute-state-card-component',
  templateUrl: './contribute-state-card-component.component.html',
  styleUrls: ['./contribute-state-card-component.component.scss']
})
export class ContributeStateCardComponentComponent implements OnInit {
  @Input() cardTitle: any = '';
  @Input() stateCount: number = 0;
  @Input() iconClass: string = 'icon-Contribute';
  constructor() { }

  ngOnInit(): void {
  }

}
