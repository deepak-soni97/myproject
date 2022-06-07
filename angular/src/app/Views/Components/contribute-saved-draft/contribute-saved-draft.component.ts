import { Component, OnInit } from '@angular/core';
import { TopicContributePageComponent } from '@AppPages/topic-contribute-page/topic-contribute-page.component';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-contribute-saved-draft',
  templateUrl: './contribute-saved-draft.component.html',
  styleUrls: ['./contribute-saved-draft.component.scss']
})
export class ContributeSavedDraftComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<TopicContributePageComponent>) { }

  ngOnInit(): void {
  }

}
