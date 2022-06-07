import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SvcCoursesService, SvcCurriculumsService, SvcGradesService, SvcSubjectsService } from '@AppServices';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss']
})
export class CourseManagementComponent implements OnInit, AfterViewInit  {
  basicForm: FormGroup;
  isCourseEnable: boolean = false;
  isGradeEnable: boolean = false;
  isSubjectEnable: boolean = false;
  isCategoryEnable: boolean = false;
  Curriculums: any = [];
  GradesMasterList: any = [];
  SubjectsMasterList: any = [];
  coursesMasterList: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formDialog', { static: true }) formPopup: TemplateRef<any>;
  @ViewChild('confirmation', { static: true }) confirmationPopup: TemplateRef<any>;
  public displayedColumns: string[] = [ 'orderId','coursename','enabled'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'action'];
  public columnsFilters = {};
  public dataSource: MatTableDataSource<any>;
  constructor(private fb: FormBuilder,
    private svcCurriculum: SvcCurriculumsService,
    private svcGrade: SvcGradesService,
    private svcSubjects: SvcSubjectsService,
    private svcCourses: SvcCoursesService,
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
      GradeSelectList: [[], [Validators.required]],
      SubjectSelectList: [[], [Validators.required]],
    });
    this.formCreation = new FormGroup({
      "id": new FormControl(0, Validators.required),
      "coursename": new FormControl('', Validators.required),
      "coursegroupid": new FormControl(0),
      "gradeid": new FormControl(0),
      "enabled": new FormControl(null),
      "orderId": new FormControl(1, Validators.required)
    });
    this.svcCurriculum.CurriculumGetBySchool().subscribe(result => {
      this.Curriculums = result;
    })
  }
 GradeGetFromServer(selectedProgramsValues: any) {
  this.isCourseEnable =false;
  this.dataSource = new MatTableDataSource<any>();
    let selectedPrograms: any = selectedProgramsValues;
    this.basicForm.patchValue({ programSelectList: selectedProgramsValues });
    this.isGradeEnable = selectedProgramsValues?.id > 0;
    this.basicForm.patchValue({
      GradeSelectList: [],
      SubjectSelectList: []
    })
    this.isSubjectEnable = false;
    if (this.isGradeEnable) {
      let selProgIds: any = [selectedPrograms.id];
      this.svcGrade.GradesGetByCurriculumId(selProgIds).subscribe((grd: any) => {
        this.GradesMasterList = grd.map((result: any) => {
          result.title = result.gradename
          result.groupName = selectedPrograms.title
          return result;
        })
      })
    }
  }

  SubjectsGetFromServer(selectedGradesVal: any) {
    this.isCourseEnable =false;
    this.dataSource = new MatTableDataSource<any>();
    this.basicForm.patchValue({ GradeSelectList: selectedGradesVal });
    this.isSubjectEnable = selectedGradesVal?.id > 0;
    this.basicForm.patchValue({
      CourseSelectList: [],
      SubjectSelectList: []
    })
    if (this.isGradeEnable) {
      this.svcSubjects.SubjectsGetAll().subscribe((result: any) => {
        this.SubjectsMasterList = result
      })
    }   
  }
  CoursesGetFromServer(selectedSubjects: any) {
    selectedSubjects = selectedSubjects.id ? selectedSubjects : null;
    this.basicForm.patchValue({
      SubjectSelectList: []
    })
    this.basicForm.patchValue({
      SubjectSelectList: selectedSubjects
    });
    let selectedGrades = this.basicForm.controls.GradeSelectList.value;
    if (selectedSubjects && selectedGrades?.id > 0) { 
      this.isCourseEnable =true;   
      this.fillOutcomeDt();
    }
    else{
      this.isCourseEnable =false;  
    }
  }
    fillOutcomeDt() {
    let selectedGrades = this.basicForm.controls.GradeSelectList.value;
    let selectedSubjects=this.basicForm.controls.SubjectSelectList.value;
    if (selectedSubjects && selectedGrades?.id > 0)
    {
    this.svcCourses.CoursesGetByGradeAndSubjectIdAdmin(selectedGrades.id,selectedSubjects.id).subscribe((result: any) => {
      this.dataSource.data = result;
    })
  }
  }

  dialogRefDelete: any;
  formCreation: FormGroup;
  dialogRefForm: any;
  OpenCreatePopup(isNew: boolean, data: any = null) {
    this.formCreation.patchValue({
      id: data?.id || 0,
      coursename: data?.coursename || '',
      coursegroupid: data?.coursegroupid || 0,
      gradeid:data?.gradeid||0,
      enabled: data?.enabled || null,
      orderId:data?.orderId||((this.dataSource.data.length>0)?this.dataSource.data[this.dataSource.data.length-1].orderId+1:1)
    })
    this.dialogRefForm = this.dialog.open(this.formPopup, {
      width: "500px"
    });
  }
  save(doSave: boolean) {
    //Object.assign(new Person(), this.formInstance.value)
    if (doSave) {

      if (this.formCreation.valid) {
        debugger
        if (!this.formCreation.value || this.formCreation.value.id == 0) {
          this.svcCourses.CoursesAddNew({
            coursename:this.formCreation.value.coursename,
            coursegroupid:0,
            gradeid:this.basicForm.controls.GradeSelectList.value.id,
            enabled:this.formCreation.value.enabled,
            orderId:this.formCreation.value.orderId
          },this.basicForm.controls.SubjectSelectList.value.id).subscribe(x => {
            this.fillOutcomeDt();
            this.dialog.closeAll();
          })
        } else if (this.formCreation.value.id > 0) {

          this.svcCourses.CoursesUpdate({
            id:this.formCreation.value.id,
            coursename:this.formCreation.value.coursename,
            coursegroupid:this.formCreation.value.coursegroupid,
            gradeid:this.formCreation.value.gradeid,
            enabled:this.formCreation.value.enabled,
            orderId:this.formCreation.value.orderId,
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
  // toggleState(data: any, state: any) {
  //   this.svcCourses.CoursesStatusToggle(data.id, state.checked).subscribe(x => {
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
          this.svcCourses.CoursesStatusToggle(data.id, state.checked).subscribe(x => {
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

