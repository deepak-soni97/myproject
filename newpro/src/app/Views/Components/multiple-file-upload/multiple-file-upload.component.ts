import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WebConfig } from '@AppConfigs/WebConfig';
import { FileUploadValidators, FileUploadControl } from '@iplab/ngx-file-upload';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-multiple-file-upload',
  templateUrl: './multiple-file-upload.component.html',
  styleUrls: ['./multiple-file-upload.component.scss']
})
export class MultipleFileUploadComponent implements OnInit {
  private subscription: Subscription;
  @Output() uploadFilesItemsEmitter: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void {
    this.subscription = this.fileUploadControl.valueChanges.subscribe((values: Array<File>) => {

      this.uploadFilesItemsEmitter.emit(values.map((item: File) => {
        return Object.assign(item, {
          isDownloadable: false,
          id: 0
        }, {})
      }))
    });
  }
  public animation: boolean = false;
  attachmentError: boolean = false;

  public fileUploadControl: any;

  constructor(
    private fb: FormBuilder
  ) {
    this.fileUploadControl = new FileUploadControl({ accept: WebConfig.allowedExtensions.map(row => `.${row}`), discardInvalid: true },
      [
        FileUploadValidators.filesLimit(10),
        FileUploadValidators.accept(WebConfig.allowedExtensions.map(row => `.${row}`)),
        FileUploadValidators.fileSize(100 * 1024 * 1024)]
    );
  }
  attachmentErrorClick() {

  }

  getFileIconCss(att: any, additionalCss: string) {
    let icon = WebConfig.contentTypeIcon(att.type, att.name.split(".").reverse()[0]);
    return icon + ` ${additionalCss}`;
  }


}
