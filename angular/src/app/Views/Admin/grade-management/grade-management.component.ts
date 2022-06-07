import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SvcGradesService, SvcCurriculumsService} from '@AppServices';

@Component({
  selector: 'app-grade-management',
  templateUrl: './grade-management.component.html',
  styleUrls: ['./grade-management.component.scss']
})
export class GradeManagementComponent implements OnInit, AfterViewInit  {
  basicForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formDialog', { static: true }) formPopup: TemplateRef<any>;
  @ViewChild('confirmation', { static: true }) confirmationPopup: TemplateRef<any>;
  Curriculums: any = [];
  public displayedColumns: string[] = ['id', 'gradenumber','gradename','curriculaid','isenabled','orderid','mastergradeid'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'action'];
  public columnsFilters = {};
  public dataSource: MatTableDataSource<any>;
  constructor(private fb: FormBuilder,
    private svcCurriculum: SvcCurriculumsService,   
    private svcGrade: SvcGradesService,   
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
      programSelectList: [[], [Validators.required]],
    });
    this.formCreation = new FormGroup({
      "id": new FormControl(0, Validators.required),
      "gradenumber": new FormControl('', Validators.required),
      "gradename": new FormControl('', Validators.required),
      "curriculaid": new FormControl(0, Validators.required),
      "isenabled": new FormControl(null, Validators.required),
      "orderid": new FormControl(1, Validators.required),
      "mastergradeid": new FormControl(0, Validators.required)
    });
    this.svcCurriculum.CurriculumGetBySchool().subscribe(result => {
      this.Curriculums = result;
    })
  }
  GradeGetFromServer(selectedProgramsValues: any) {
    let selectedPrograms: any = selectedProgramsValues;
    this.basicForm.patchValue({ programSelectList: selectedProgramsValues });
    if(selectedProgramsValues?.id > 0){
      this.fillOutcomeDt();
    }
  }
    fillOutcomeDt() {
    this.svcGrade.GradesGetByCurriculumIdAdmin(this.basicForm.value.programSelectList.id).subscribe((result: any) => {
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
      gradenumber: data?.gradenumber || '',
      gradename: data?.gradename || '',
      curriculaid:data?.curriculaid||0,
      isenabled: data?.isenabled || null,
      orderid: data?.orderid || 1,
      mastergradeid: data?.masterGradeId || 0,
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
          this.svcGrade.GradesAddNew({

          }).subscribe(x => {
            this.fillOutcomeDt();
            this.dialog.closeAll();
          })
        } else if (this.formCreation.value.id > 0) {

          this.svcGrade.GradesUpdate({

          }).subscribe(x => {
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
    this.svcGrade.GradesStatusToggle(data.id, state.checked).subscribe(x => {
      this.fillOutcomeDt();
    })
  }
}

