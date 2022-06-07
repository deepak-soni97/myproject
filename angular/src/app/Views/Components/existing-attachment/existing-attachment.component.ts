import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '@AppConfigs/environment';
import { WebConfig } from '@AppConfigs/WebConfig';
import { SvcMasterDataService } from "@AppServices"

@Component({
  selector: 'app-existing-attachment',
  templateUrl: './existing-attachment.component.html',
  styleUrls: ['./existing-attachment.component.scss']
})
export class ExistingAttachmentComponent implements OnInit {
  @Input() ExistingTopicAttachments: any = [];
  @Input() ShowDelete: boolean = false;
  @Input() showInList = false;
  // @Input() showImage = false;
  @Output() onDeleteFileEmitter : EventEmitter<any> = new EventEmitter<any>();
  @Output() onFilenameclickEmitter : EventEmitter<any> = new EventEmitter<any>();
  fileUrl: any;
  constructor(private svcMasterDataService: SvcMasterDataService) {
    
   }

  ngOnInit(): void {
  }
  deleteFileEvent(att: any) {
    // this.svcMasterDataService.FileDelete(att.id).subscribe(row => {
      this.onDeleteFileEmitter.emit(att)
    //   this.ExistingTopicAttachments = this.ExistingTopicAttachments.filter((x: any) => x.id != att.id)
    // })
  }
  getFileIconCss(att: any, additionalCss: string) {
    let icon = WebConfig.contentTypeIcon(att.contentType, att.fileextension)
    return icon + ` ${additionalCss}`;
  }
  redirectToPreview(att: any) {
    let url: any = att.fileurl.split("/");
    window.open(WebConfig.PagesName.FileViewerPage + "?file=" + url[url.length - 1], '_blank', '');
   }
   reviewInSame(att: any) {
//let url: any = att.fileurl.split("/");
  //  window.open(WebConfig.PagesName.FileViewerPage + "?file=" + url[url.length - 1], '_self', '');
   this.onFilenameclickEmitter.emit(att)
   console.log()
    //  console.log('btn clicked - ', att)
    // this.fileUrl = att.fileurl.split("/");
    // this.fileUrl = (WebConfig.PagesName.FileViewerPage + "?file=" + this.fileUrl[this.fileUrl.length - 1]);
    // console.log('file url is - ', this.fileUrl)
   }

  //  url='./assets/imges/banner.jpg';
  //onselectFile(e:any){
  //   if(e.target.files){
  //     var reader = new FileReader();
  //     reader.readAsDataURL(e.target.files[0])
  //     reader.onload=(event:any)=>{
  //       this.url=event.target.result;
  //     }
  //   }
  // }
  downloadFileEvent(att: any) {
    let url = `${environment.ApiEndPoint}${environment.EndPoints.DocumentsManagement.Endpoint}${environment.EndPoints.DocumentsManagement.methods.DownloadFileAsync}/${att.id}`;
    window.open(url, '_blank', '');   
  }
}
