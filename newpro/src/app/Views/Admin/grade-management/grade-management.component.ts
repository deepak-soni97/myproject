import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SvcGradesService, SvcCurriculumsService } from '@AppServices';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grade-management',
  templateUrl: './grade-management.component.html',
  styleUrls: ['./grade-management.component.scss']
})
export class GradeManagementComponent implements OnInit, AfterViewInit {
  basicForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formDialog', { static: true }) formPopup: TemplateRef<any>;
  @ViewChild('confirmation', { static: true }) confirmationPopup: TemplateRef<any>;
  Curriculums: any = [];
  GradeMasters: any = [];
  public displayedColumns: string[] = ['orderid','gradenumber', 'gradename', 'isenabled'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'action'];
  public columnsFilters = {};
  public enableAddNew=false;
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
      "mastergradeid": new FormControl(0),
      "gradenumber": new FormControl(''),
      "gradename": new FormControl('', Validators.required),
      "isenabled": new FormControl(null),
      "orderid": new FormControl(1, Validators.required)
    });
    this.svcCurriculum.CurriculumGetBySchool().subscribe(result => {
      this.Curriculums = result;
    })
    this.svcGrade.GradesGetMaster().subscribe((result: any) => {
      this.GradeMasters = result;
      this.GradeMasters = result.map((result: any) => {
        result.title = result.gradename
        return result;
      })
    })
  }
  GradeGetFromServer(selectedProgramsValues: any) {
    let selectedPrograms: any = selectedProgramsValues;
    this.basicForm.patchValue({ programSelectList: selectedProgramsValues });
    if (selectedProgramsValues?.id > 0) {
      this.enableAddNew=true;
      this.fillOutcomeDt();
    }
    else{
      this.enableAddNew=false;
    }
  }
  fillOutcomeDt() {
    this.svcGrade.GradesGetByCurriculumIdAdmin(this.basicForm.value.programSelectList.id).subscribe((result: any) => {
      this.dataSource.data = result;
    })
  }

  dialogRefDelete: any;
  formCreation: FormGroup;
  dialogRefForm: any;
  OpenCreatePopup(isNew: boolean, data: any = null) {
    this.formCreation.patchValue({
      id: data?.id || 0,
      mastergradeid: this.GradeMasters.filter((row: any) => row.id == data?.masterGradeId)[0] || null,
      gradenumber: data?.gradename || '',
      isenabled: data?.isenabled || null,
      orderid:data?.orderid||((this.dataSource.data.length>0)?this.dataSource.data[this.dataSource.data.length-1].orderid+1:1)
    })
    this.dialogRefForm = this.dialog.open(this.formPopup, {
      width: "500px"
    });
  }
  AssignMasterGradeSelected(selectedMasterGradeValues: any) {
    this.formCreation.patchValue({ mastergradeid: selectedMasterGradeValues.id,gradenumber:selectedMasterGradeValues.gradename });
  }
  save(doSave: boolean) {
    //return;
    //Object.assign(new Person(), this.formInstance.value)
    if (doSave) {

      if (this.formCreation.valid) {
        debugger
        this.formCreation.value.curriculaid=this.basicForm.value.programSelectList.id;
        if (!this.formCreation.value || this.formCreation.value.id == 0) {
          this.svcGrade.GradesAddNew(this.formCreation.value).subscribe(x => {
            this.fillOutcomeDt();
            this.dialog.closeAll();
          })
        } else if (this.formCreation.value.id > 0) {
          this.formCreation.value.mastergradeid=this.formCreation.value.mastergradeid.id;
          this.svcGrade.GradesUpdate(this.formCreation.value).subscribe(x => {
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
  //   this.svcGrade.GradesStatusToggle(data.id, state.checked).subscribe(x => {
  //     this.fillOutcomeDt();
  //   })
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
          
          this.svcGrade.GradesStatusToggle(data.id, state.checked).subscribe(x => {
            this.fillOutcomeDt();
          })
          Swal.fire(
            'Success!',
            'Successfully changed the state!',
            'success'
          )
        }
        else{
          state.source.checked = !state.source.checked
        }
      })
  }
}

