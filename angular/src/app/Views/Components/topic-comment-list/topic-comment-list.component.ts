import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SharedServiceService, SvcTopicsService } from '@AppServices';
var filter = require('leo-profanity');



@Component({
  selector: 'app-topic-comment-list',
  templateUrl: './topic-comment-list.component.html',
  styleUrls: ['./topic-comment-list.component.scss']
})
export class TopicCommentListComponent implements OnInit {
  @Input() topicId: number;
  commentSubmissionForm: FormGroup;
  userProfile: any;
  fillteredComment:any='';
  replyComment:any='';
  childReply:any = '';
  constructor(private svcTopic: SvcTopicsService, private fb: FormBuilder, private svcShared: SharedServiceService) {
    this.commentSubmissionForm = this.fb.group(
      {
        commentTextVal: [''],

        commentItems: new FormArray([
          //this.getCommentItemFormGroup({})
        ])
      }
    )

  }
  changeHandler(_$event: any){
    this.fillteredComment = filter.clean(_$event,'');

  }
  reply(_$event: any){
    this.replyComment = filter.clean(_$event,'');

  }

  replyHandler(_$event: any){
    this.childReply = filter.clean(_$event,'');
  }

  ngOnInit(): void {
    if (this.topicId) {
      this.parentCommentGet();
    }
    this.svcShared.getUserProfile.subscribe(row => {
      this.userProfile = row;
    })
   
    //console.log(filter.clean('I have boob', ''));
  }
  getformArrayGet(name: string): FormArray {

    const result = <FormArray>this.commentSubmissionForm.get(name);
    return result
  }
  getformArrayGetFromElement(element: any): FormArray {

    const result = <FormArray>element.get("commentItems");
    return result
  }

  postCommentSubmit(parentId: number, commentText: string, element: any, parentElement: any = null) {
    // if (parentId <= 0) {
    this.svcTopic.TopicCommentSubmit(this.topicId, commentText, parentId).subscribe(row => {
      debugger;
      if (!element) {
        parentElement.patchValue({
          commentTextVal: [''],
          commentItems: new FormArray([
            this.getCommentItemFormGroup(row)
          ])
        })
      } else {
        element.push(this.getCommentItemFormGroup(row));
      }
    })
    //}
  }
  loadChildComments(parentId: number, element: any, isViewReply: boolean = false) {
    this.svcTopic.TopicChildCommentGet(parentId).subscribe((row: any) => {
      if (isViewReply) {
        element.clear();
      }
      row.map((row: any) => {
        element.push(this.getCommentItemFormGroup(row))
      })
    })
  }
  getCommentItemFormGroup(existingItem: any) {
    return this.fb.group(Object.assign({ showReply: false, commentTextVal: [''], commentItems: new FormArray([]) }, existingItem));
  }
  // Comment Section 
  parentCommentGet() {
    this.svcTopic.TopicParentCommentGet(this.topicId).subscribe((data: any) => {

      const commentItems = this.getformArrayGet("commentItems");
      data.map((row: any) => {
        commentItems.push(this.getCommentItemFormGroup(row))
      })

    })
  }
  toggleReply(rootCmnt: any) {
    // if (level == 0) {
    //   let fields = this.getformArrayGet('commentItems').controls[index];
    rootCmnt.patchValue({ showReply: !rootCmnt.value.showReply })
    // }
    //this.isFirstComment[i] = !this.isFirstComment[i];
  }
  getDate(date: any) {
    return new Date(date).toLocaleDateString('en-TT', {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    });
  }
}
