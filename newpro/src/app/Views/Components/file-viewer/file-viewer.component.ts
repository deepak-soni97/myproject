// import { InputModalityDetector } from '@angular/cdk/a11y';
import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { WebConfig } from '@AppConfigs/WebConfig';
import { PlyrComponent } from 'ngx-plyr';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {

  constructor(private elRef: ElementRef) { }
  @Input() fileName: string = ""
  @Input() fileViewerUrl: string = "";
  @Input() viewerType: string = "url";
  @Input() fileContentType: string = '';

  isPdfFile: boolean = false;
  isText: boolean = false;
  isMsOfficeFile: boolean = false
  isImage: boolean = false;
  isAudio: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fileViewerUrl']) {
      this.ngOnInit();

    }
    // this.fileName=changes['fileName'].currentValue;
    // this.getFilePreviewUrl();
  }

  ngOnInit(): void {

    this.isPdfFile = this.fileName.split(".").reverse()[0].toLowerCase() == "pdf";
    this.isText = this.fileName.split(".").reverse()[0].toLowerCase() == "txt";
    this.isMsOfficeFile = WebConfig.msFileExtensions.indexOf(this.fileName.split(".").reverse()[0].toLowerCase()) > -1;
    this.isImage = WebConfig.allowedImageExtensions.indexOf(this.fileName.split(".").reverse()[0].toLowerCase()) > -1;
    this.isAudio = WebConfig.audioVideoExtensions.indexOf(this.fileName.split(".").reverse()[0].toLowerCase()) > -1;
    if (this.isAudio) {
      const player = this.elRef.nativeElement.querySelector('video');
      if (player)
        player.load();
    }
    // this.videoSources=[];
    // if (isAudio) {

    //   this.videoSources.push({
    //     src: this.fileViewerUrl,
    //     type: 'video/wmv'
    //   })

    // }
    // this.isAudio = isAudio;
  }

  @ViewChild(PlyrComponent, { static: true })
  plyr: PlyrComponent;

  // or get it from plyrInit event
  player: Plyr;

  videoSources: Plyr.Source[] = [{
    src: 'https://edupedia-dev.s3.eu-west-1.amazonaws.com/TopicFiles/637758749473267111_sample-mp4-file.mp4?X-Amz-Expires=14400&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUFHTES7BUZHSF4WV/20211226/eu-west-1/s3/aws4_request&X-Amz-Date=20211226T084743Z&X-Amz-SignedHeaders=host&X-Amz-Signature=089a88d01ca54b75c07a4c2f2ad26bb541cb8435202c2c9156ae1b5789c60cf0',
    type: 'video/mp4',
    size: 720,
  },
  ]
  played(event: Plyr.PlyrEvent) {

  }

  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }

  pause(): void {
    this.player.pause(); // or this.plyr.player.play()
  }

  stop(): void {
    this.player.stop(); // or this.plyr.player.stop()
  }
}
