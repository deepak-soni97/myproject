import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SvcCurriculumsService} from '@AppServices';

@Component({
  selector: 'app-curriculum-management',
  templateUrl: './curriculum-management.component.html',
  styleUrls: ['./curriculum-management.component.scss']
})
export class CurriculumManagementComponent implements OnInit, AfterViewInit  {
  basicForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formDialog', { static: true }) formPopup: TemplateRef<any>;
  @ViewChild('confirmation', { static: true }) confirmationPopup: TemplateRef<any>;

  public displayedColumns: string[] = ['id', 'name','title','isenabled','ordernumber'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'action'];
  public columnsFilters = {};
  public dataSource: MatTableDataSource<any>;
  constructor(private fb: FormBuilder,
    private svcCurriculum: SvcCurriculumsService,    
    public dialog: MatDialog
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
    this.basicForm = this.fb.group({
      
    });
    this.formCreation = new FormGroup({
      "id": new FormControl(0, Validators.required),
      "name": new FormControl('', Validators.required),
      "title": new FormControl('', Validators.required),
      "ordernumber": new FormControl(1, Validators.required)
    });
    this.fillOutcomeDt();
  }
    fillOutcomeDt() {
    this.svcCurriculum.CurriculumGetAllAdmin().subscribe((result: any) => {
      console.log(result)
      this.dataSource.data = result;
    })
  }

  dialogRefDelete: any;
  formCreation: FormGroup;
  dialogRefForm: any;
  OpenCreatePopup(isNew: boolean, data: any = null) {
    console.log(isNew, data)
    this.formCreation.patchValue({
      id: data?.id || 0,
      name: data?.name || '',
      title: data?.title || '',
      ordernumber:data?.ordernumber||(this.dataSource.data.length>0)?this.dataSource.data[this.dataSource.data.length-1].ordernumber+1:1
    })
    this.dialogRefForm = this.dialog.open(this.formPopup, {
      width: "500px"
    });
    console.log(this.formCreation);
  }
  save(doSave: boolean) {
    console.log(this.formCreation.value)
    //Object.assign(new Person(), this.formInstance.value)
    if (doSave) {

      if (this.formCreation.valid) {
        debugger
        if (!this.formCreation.value || this.formCreation.value.id == 0) {
          this.svcCurriculum.CurriculumAddNew(this.formCreation.value.id, this.formCreation.value.name, this.formCreation.value.title,this.formCreation.value.ordernumber).subscribe(x => {
            this.fillOutcomeDt();
            this.dialog.closeAll();
          })
        } else if (this.formCreation.value.id > 0) {

          this.svcCurriculum.CurriculumUpdate(this.formCreation.value.id, this.formCreation.value.name, this.formCreation.value.title,this.formCreation.value.ordernumber).subscribe(x => {
            this.fillOutcomeDt();
            this.dialog.closeAll();
          })
        }
      }
    } else{         
      this.dialog.closeAll();
    }
      
  }
  toggleState(data: any, state: any) {
    console.log(data, state)
    this.svcCurriculum.CurriculumStatusToggle(data.id, state.checked).subscribe(x => {
      this.fillOutcomeDt();
    })
  }
}
