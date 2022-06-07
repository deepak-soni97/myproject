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
  @Output() onDeleteFileEmitter : EventEmitter<any> = new EventEmitter<any>();
  constructor(private svcMasterDataService: SvcMasterDataService) { }

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
  downloadFileEvent(att: any) {
    let url = `${environment.ApiEndPoint}${environment.EndPoints.DocumentsManagement.Endpoint}${environment.EndPoints.DocumentsManagement.methods.DownloadFileAsync}/${att.id}`;
    window.open(url, '_blank', '');   
  }
}
