import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SvcCurriculumsService, SvcSubjectsService } from '@AppServices';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-subject-management',
  templateUrl: './subject-management.component.html',
  styleUrls: ['./subject-management.component.scss']
})
export class SubjectManagementComponent implements OnInit, AfterViewInit {
  basicForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formDialog', { static: true }) formPopup: TemplateRef<any>;
  @ViewChild('confirmation', { static: true }) confirmationPopup: TemplateRef<any>;

  public displayedColumns: string[] = ['iconurl','orderid', 'name', 'title', 'isenabled'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'action'];
  public columnsFilters = {};
  public dataSource: MatTableDataSource<any>;
  constructor(private fb: FormBuilder,
    private svcSubject: SvcSubjectsService,
    public dialog: MatDialog,
    private svcCurriculum: SvcCurriculumsService, private ngModalService: NgbModal
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    //debugger;
    // this.basicForm = this.fb.group({
    // });
    this.formCreation = new FormGroup({
      "id": new FormControl(0, Validators.required),
      "name": new FormControl('', Validators.required),
      "title": new FormControl('', Validators.required),
      "orderid": new FormControl(1, Validators.required),
      "iconurl": new FormControl(''),
      "iconImage": new FormControl(null)
    });
    this.fillOutcomeDt();
  }
  fillOutcomeDt() {
    this.svcSubject.SubjectsGetAllAdmin().subscribe((result: any) => {
      this.dataSource.data = result;
    })
  }

  dialogRefDelete: any;
  formCreation: FormGroup;
  dialogRefForm: any;
  OpenCreatePopup(isNew: boolean, data: any = null) {
    
    this.iconImageChanged = null;
    this.formCreation.patchValue({
      id: data?.id || 0,
      name: data?.name || '',
      title: data?.title || '',
      orderid: data?.orderid || ((this.dataSource.data.length > 0) ? this.dataSource.data[this.dataSource.data.length - 1].orderid + 1 : 1),
      iconurl: data?.iconurl || '',
      iconImage:data?.iconurl || '',
    });
    if(!data||!data.iconurl){
      this.formCreation.controls['iconImage'].setValidators(Validators.required);
    }
    else{
      this.formCreation.controls['iconImage'].removeValidators(Validators.required);
    }
    this.dialogRefForm = this.dialog.open(this.formPopup, {
      width: "500px"
      
    });
    
  }
  save(doSave: boolean) {
    
    //Object.assign(new Person(), this.formInstance.value)
    if (doSave) {


      if (this.formCreation.valid) {
        let iconFile: any = null;
        if (this.iconImageChanged) {
          iconFile = this.b64toBlob(this.iconImageChanged, undefined);
        }
        if (!this.formCreation.value || this.formCreation.value.id == 0) {



          this.svcSubject.SubjectAdd({
            id: this.formCreation.value.id,
            name: this.formCreation.value.name,
            title: this.formCreation.value.title,
            orderid: this.formCreation.value.orderid,
            iconurl: this.formCreation.value.iconurl,

          }, iconFile).subscribe(x => {
            this.fillOutcomeDt();
            this.dialog.closeAll();
          })
        } else if (this.formCreation.value.id > 0) {
          this.svcSubject.SubjectUpdate({
            id: this.formCreation.value.id,
            name: this.formCreation.value.name,
            title: this.formCreation.value.title,
            orderid: this.formCreation.value.orderid,
            iconurl: this.formCreation.value.iconurl
          }, iconFile).subscribe(x => {
            this.fillOutcomeDt();
            this.dialog.closeAll();
          })
        }
      }
    } else {
      this.dialog.closeAll();
    }

  }
  // toggleState(data: any, state: any) {
  //   
  //   // this.svcCurriculum.CurriculumStatusToggle(data.id, state.checked).subscribe(x => {
  //   //   this.fillOutcomeDt();
  //   // })
  // }

  toggleState(data: any, state: any) {
    
    
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
        this.svcSubject.SubjectStatusToggle(data.id, state.checked).subscribe(x => {
          this.fillOutcomeDt();
        })
        Swal.fire(
          'Success!',
          'Successfully changed the state!',
          'success'
        )
      }
      else {
        state.source.checked = !state.source.checked
      }
    })
  }


  imageChangedEvent: any = '';
  onCoverFileSelected(e: any) {
    this.formCreation.controls['iconImage'].setValue(null);
    if (e.target.files) {
      // this.imageChangedEvent = e;
      // var reader = new FileReader();
      // reader.readAsDataURL(e.target.files[0])
      // reader.onload = (event: any) => {
      //   this.iconImageChanged = event.target.result;
      // }
      const fileSize = e.target.files[0].size / (1024 * 1024);
      if (fileSize <= 5) {
        this.imageChangedEvent = e;
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (event: any) => {
          this.iconImageChanged = event.target.result;
        }
        this.formCreation.controls['iconImage'].setValue('hasfile');
      } else {
        Swal.fire({
          title: 'Upload Error',
          text: `Max file size 5mb allowed.`,
          icon: 'error',
        })
      }
    }
  }
  iconImageChanged: any;

  croppedImagePre: any;
  cropperImagePopupOpen(content: any) {
    this.ngModalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  cropperImagePopupClose() {
    this.iconImageChanged = this.croppedImagePre;
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
        this.iconImageChanged = null;
        this.formCreation.controls['iconImage'].setValue(null);
      }
    })
  }
}
