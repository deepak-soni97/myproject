import { Component, OnInit } from '@angular/core';
import { TopicContributePageComponent } from '@AppPages/topic-contribute-page/topic-contribute-page.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {    Dimensions, ImageCroppedEvent, ImageTransform } from "ngx-image-cropper";
import {  Output, EventEmitter } from '@angular/core';
import { base64ToFile } from '../contribute-topic-modal/blob.util';
@Component({
  selector: 'app-modal-topic-contribute',
  templateUrl: './modal-topic-contribute.component.html',
  styleUrls: ['./modal-topic-contribute.component.scss']
})
export class ModalTopicContributeComponent implements OnInit {

  @Output() croppedImage:EventEmitter<string> = new EventEmitter();

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
  

  modalRef: MdbModalRef<TopicContributePageComponent>;
  constructor(private modalService: MdbModalService) { }

  ngOnInit(): void {
  }
  openModal() {
    this.modalRef = this.modalService.open(TopicContributePageComponent)
  }
  close(): void {
    const closeMessage = 'Modal closed';

    this.modalRef.close(closeMessage)

  }
  imageCropped(event: any) {
    this.croppedImage.emit = event.base64;    
  }

  imageLoaded() {
    this.showCropper = true;
    
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    
  }

  loadImageFailed() {
    
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
