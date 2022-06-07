import { Component, Input, OnInit } from '@angular/core';
import { WebConfig } from '@AppConfigs/WebConfig';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {

  constructor() { }
  @Input() fileName: string = ""
  @Input() fileViewerUrl: string = "";
  @Input() viewerType: string = "url";

  isPdfFile: boolean = false;
  isText: boolean = false;
  isMsOfficeFile: boolean = false
  isImage: boolean = false;
  ngOnInit(): void {
    this.isPdfFile = this.fileName.split(".").reverse()[0].toLowerCase() == "pdf";
    this.isText = this.fileName.split(".").reverse()[0].toLowerCase() == "txt";
    this.isMsOfficeFile = WebConfig.msFileExtensions.indexOf(this.fileName.split(".").reverse()[0].toLowerCase()) > -1;
    this.isImage = WebConfig.allowedImageExtensions.indexOf(this.fileName.split(".").reverse()[0].toLowerCase()) > -1;
  }

}
