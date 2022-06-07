import { AfterViewInit, Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
//import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
//import { map } from 'jquery';
import { Observable, Subject } from 'rxjs';
import { SvcTopicsService, SvcUsersService } from "@AppServices"
//import { X } from '@angular/cdk/keycodes';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-share-topic',
  templateUrl: './share-topic.component.html',
  styleUrls: ['./share-topic.component.scss']
})
export class ShareTopicComponent implements OnInit {

  @Input() TopicDetail: any;
  @Input() ShareCount: any = 0;

  public items: any;
  public input$ = new Subject<string>();

  constructor(public dialog: MatDialog, private svcUser: SvcUsersService, private svcTopic: SvcTopicsService) {
    this.input$.subscribe((newTerm: any) => {

      this.svcUser.SearchUser(newTerm).subscribe((row: any) => {
        this.items = row.map((x: any) => {
          x.displaySearch = ((x.firstName && x.lastName) ? `${x.firstName} ${x.lastName}` : `${x.email || x.userName}`) + `(${x.email || x.userName})`
          return x;
        })
      })
    });

    // this.items$ = this.input$.pipe(
    //   map((term: string) => this.searchPeople(term))
    // )
  }
  ngOnInit(): void {
  }
  @ViewChild('shareDialog', { static: true }) formDialog: TemplateRef<any>;
  dialogRefForm: any;
  selectedItems: any=[];
  openSharebox() {
    this.dialogRefForm = this.dialog.open(this.formDialog, {
      width: "50%",
      //  height: "300px",
      disableClose: true
    });
  }
  sharedList: any = [];
  onChange(event: any) {
    //this.selectedItems=event
    // event.map((row: any) => {
    //   if (this.sharedList.filter((x: any) => x.userName == row.userName).length == 0) {
    //     this.sharedList.push(row);
    //   }
    // })
   // this.selectedItems = [];
  }
  // onDelete(item: any) {
  //   this.sharedList = this.sharedList.filter((x: any) => x.userName != item.userName)
  // }
  onShare(isShare: boolean) {
    debugger;
    if (isShare) {

      this.svcTopic.TopicShare(this.TopicDetail.id, this.selectedItems.filter((x: any) => x.email).map((x: any) => x.email)).subscribe(row => {
        Swal.fire(
          'Success!',
          'Topic Shared Successfully',
          'success'
        ).then(x => {
          this.selectedItems = [];
          this.dialog.closeAll();
        })
      }, err => {
        Swal.fire(
          'Error!',
          'Error Occured.',
          'error'
        )
      })
    } else
      this.dialog.closeAll();




  }
}
