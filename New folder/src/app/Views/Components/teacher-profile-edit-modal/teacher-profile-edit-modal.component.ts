import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Dimensions, ImageTransform } from 'ngx-image-cropper';
import { TeacherProfileEditPageComponent } from '@AppPages/teacher-profile-edit-page/teacher-profile-edit-page.component';
import { base64ToFile } from '@AppComponents/contribute-topic-modal/blob.util';
@Component({
  selector: 'app-teacher-profile-edit-modal',
  templateUrl: './teacher-profile-edit-modal.component.html',
  styleUrls: ['./teacher-profile-edit-modal.component.scss']
})
export class TeacherProfileEditModalComponent implements OnInit {
  @Output() croppedImage:EventEmitter<string> = new EventEmitter();
  @Input() ImageEventFile: any = true;

  cropImgPreview: any = "";
  imgChangeEvt:any={};
  imageChangedEvent: any = '';
  //croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  onFileChange(event: any): void {
    this.imageChangedEvent = event;
    
  }
  

  modalRef: MdbModalRef<TeacherProfileEditPageComponent>;
  constructor(private modalService: MdbModalService) { }

  ngOnInit(): void {
  }
  openModal() {
    this.modalRef = this.modalService.open(TeacherProfileEditPageComponent)
  }
  close(): void {
    const closeMessage = 'Modal closed';

    this.modalRef.close(closeMessage)

  }
  imageCropped(event: any) {
    this.croppedImage.emit = event.base64;
    console.log(event, base64ToFile(event.base64));
    
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }
   

}
