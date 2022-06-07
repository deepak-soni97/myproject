import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ViewportScroller } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SharedServiceService, SvcLocalStorageService, SvcAuthenticationService, SvcTopicsService, SvcUsersService } from '@AppServices';
import { environment } from '@AppConfigs/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebConfig } from '@AppConfigs/WebConfig';
@Component({
  selector: 'app-teacher-profile-edit-page',
  templateUrl: './teacher-profile-edit-page.component.html',
  styleUrls: ['./teacher-profile-edit-page.component.css']
})
export class TeacherProfileEditPageComponent implements OnInit {

  public Editor = ClassicEditor;
  data = new FormControl('');
  row: any;
  SchoolName: any;
  title: any;
  email: any;
  EditForm: FormGroup;
  //teachingsince = (new Date()).toUTCString();
  userObjFromToken: any;
  userdata: string;
  teachingSinceFormat: any;
  profilePicChanged: any;

  constructor(private ngModalService: NgbModal, private svcAuth: SvcAuthenticationService, private route: ActivatedRoute, private router: Router, private viewportScroller: ViewportScroller,
    private svcUser: SvcUsersService, private svcLocalStorage: SvcLocalStorageService, private sharedService: SharedServiceService, private svcShared: SharedServiceService, private svcTopicsService: SvcTopicsService, private fb: FormBuilder) {
    this.EditForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      teachingsince: ['', [Validators.required]],
      aboutme: [''],
      myexpertise: [''],
      twiterprofile: [''],
      facebookprofile: [''],
      linkedinprofile: [''],
      youtubeprofile: [''],
      website: [''],
      profilepic: ['']
    });
    this.userObjFromToken = this.svcLocalStorage.GetData(environment.AuthTokenKeyLSKey);
    if (this.userObjFromToken) {

      this.userObjFromToken = JSON.parse(this.userObjFromToken);
      this.title = this.userObjFromToken.username;
      this.SchoolName = this.userObjFromToken.schoolDisplayName;
      this.svcUser.UserProfileGet().subscribe((profile: any) => {
        this.email = profile.email;
        profile.teachingsince = this.teachingSinceFormat = profile.teachingsince ? moment(profile.teachingsince).format("MM/DD/yyyy") : '';
       
        this.EditForm.patchValue(profile);

      })

    }

  }

  ngOnInit(): void {
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
  // getUserDetail() {
  //   this.svcTopicsService.getUserDetail().subscribe(row => {
  //     this.row = row[0];
  //     this.SchoolName = row[0]['value'][0]['SchoolName'];

  //     //  ;
  //   })
  // }
  // getEmailDetail() {
  //   this.svcTopicsService.getEmailDetail().subscribe(row => {
  //     this.row = row[0];
  //     this.title = row[0]["Title"]
  //     this.email = row[0]["Email"]
  //     // this.my_expertise = row[0]['value'][0]['My_Experties'];
  //     // ;

  //   })
  // }
  getControl(ctrlName: string) {
    return this.EditForm.get(ctrlName);
  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.EditForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
  onSubmit() {
    //this.findInvalidControls()
    this.validateAllFormFields(this.EditForm);
    if (this.EditForm.valid) {
      const formValues = this.EditForm.value


      const formdata = new FormData();
      if (this.profilePicChanged) {
        formdata.append('profilepicImage', this.b64toBlob(this.profilePicChanged, undefined));
      }

      formdata.append("firstname", formValues.firstname);
      formdata.append("lastname", formValues.lastname);
      formdata.append("teachingsince", formValues.teachingsince);
      formdata.append("aboutme", formValues.aboutme);
      formdata.append("myexpertise", formValues.myexpertise);
      formdata.append("twiterprofile", formValues.twiterprofile);
      formdata.append("facebookprofile", formValues.facebookprofile);
      formdata.append("linkedinprofile", formValues.linkedinprofile);
      formdata.append("youtubeprofile", formValues.youtubeprofile);
      formdata.append("website", formValues.website);
      this.svcUser.UpdateTeacherProfile(formdata).subscribe(data => {

        this.sharedService.setUserProfile(data);
        Swal.fire({
          title: 'Success',
          text: `successfully Updated`,
          icon: 'success',
        }).then((result) => {
          this.router.navigate([WebConfig.PagesName.TeacherProfile]);
        })
      }, err => {
        Swal.fire({
          title: 'Error',
          text: `Error Occured`,
          icon: 'error',
        })
      })
    }
  }
  imageChangedEvent: any = '';
  onCoverFileSelected(e: any) {
    if (e.target.files) {

      const fileSize = e.target.files[0].size / (1024 * 1024);
      if (fileSize <= 5) {
        this.imageChangedEvent = e;
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (event: any) => {
          this.profilePicChanged = event.target.result;
        }
      } else {
        Swal.fire({
          title: 'Upload Error',
          text: `Max file size 5mb allowed.`,
          icon: 'error',
        })
      }
    }
  }
  croppedImagePre: any;
  cropperImagePopupOpen(content: any) {
    this.ngModalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  cropperImagePopupClose() {
    this.profilePicChanged = this.croppedImagePre;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImagePre = event.base64;
  }
  b64toBlob(ImageURL: any, sliceSize: any) {
    try {

      var block = ImageURL.split(";");
      // Get the content type of the image
      var contentType = block[0].split(":")[1];// In this case "image/gif"
      // get the real base64 content of the file
      var realData = block[1].split(",")[1];//
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(realData);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      var blob = new Blob(byteArrays, { type: contentType });
      return blob;
    } catch (e) {
      return "";
    }

  }
  onCancelImageEditing() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profilePicChanged = null;
      }
    })
  }
}