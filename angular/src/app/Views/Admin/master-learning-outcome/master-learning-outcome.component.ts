import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SvcCoursesService, SvcCurriculumsService, SvcGradesService, SvcLearningOutcomesService, SvcSubjectsService } from '@AppServices';

@Component({
  selector: 'app-master-learning-outcome',
  templateUrl: './master-learning-outcome.component.html',
  styleUrls: ['./master-learning-outcome.component.scss']
})
export class MasterLearningOutcomeComponent implements OnInit {
 
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

  public displayedColumns: string[] = ['orderid', 'outcome', 'isEnabled'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];
  public columnsFilters = {};

  public dataSource: MatTableDataSource<any>;
  // public dialogRef: MatDialogRef<any>;//mat-dialog-content
  constructor(private fb: FormBuilder,
    private svcCurriculumn: SvcCurriculumsService,
    private svcGrade: SvcGradesService,
    private svcSubjects: SvcSubjectsService,
    private svcCourses: SvcCoursesService,
    private svcLearningOutcome: SvcLearningOutcomesService,

    public dialog: MatDialog
  ) {

    this.dataSource = new MatTableDataSource<any>();

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.basicForm = this.fb.group({
      programSelectList: [[], [Validators.required]],
      GradeSelectList: [[], [Validators.required]],
      CourseSelectList: [[], [Validators.required]],
      SubjectSelectList: [[], [Validators.required]],
    });
    this.formCreation = new FormGroup({
      "id": new FormControl(0, Validators.required),
      "Outcome": new FormControl('', Validators.required),
      "Orderid": new FormControl(0, Validators.required),
      "Courseid": new FormControl('', Validators.required),
      "isEnabled": new FormControl(true)
    });
    this.svcCurriculumn.CurriculumGetBySchool().subscribe(result => {
      this.Curriculums = result;
    })
  }
  GradeGetFromServer(selectedProgramsValues: any) {
    let selectedPrograms: any = selectedProgramsValues;
    this.basicForm.patchValue({ programSelectList: selectedProgramsValues });
    this.isGradeEnable = selectedProgramsValues?.id > 0;
    this.basicForm.patchValue({
      GradeSelectList: [],
      CourseSelectList: [],
      SubjectSelectList: []
    })
    this.isSubjectEnable = false;
    this.isCourseEnable = false;
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
    this.basicForm.patchValue({ GradeSelectList: selectedGradesVal });
    this.isSubjectEnable = selectedGradesVal?.id > 0;
    this.basicForm.patchValue({
      CourseSelectList: [],
      SubjectSelectList: []
    })
    this.isCourseEnable = false;
    if (this.isGradeEnable) {

      this.svcSubjects.SubjectGetByGrades([selectedGradesVal.id]).subscribe((result: any) => {
        this.SubjectsMasterList = result
      })
    }
  }
  CoursesGetFromServer(selectedSubjects: any) {
    selectedSubjects = selectedSubjects.id ? selectedSubjects : null;
    this.basicForm.patchValue({
      // GradeSelectList: [],
      CourseSelectList: [],
      SubjectSelectList: []
    })
    this.isCourseEnable = false;

    this.basicForm.patchValue({
      SubjectSelectList: selectedSubjects
    });
    let selectedGrades = this.basicForm.controls.GradeSelectList.value;
    if (selectedSubjects && selectedGrades?.id > 0) {
      this.isCourseEnable = true;
      this.svcCourses.CoursesGetByGradeSubjectId([selectedGrades.id], selectedSubjects.id).subscribe((result: any) => {
        this.coursesMasterList = result.map((course: any) => {
          return {
            id: course.courseId,
            title: course.courseName,
            groupName: course.courseGroupName
          }
        })
      })
    }
  }

  OutcomesGetFromServer(selectedCourseSubject: any) {
    console.log(this.basicForm.value)
    this.basicForm.patchValue(
      {
        CourseSelectList: selectedCourseSubject
      }
    )
    if (selectedCourseSubject) {
      this.fillOutcomeDt();

    }
    else {

    }
    //   this.selectaddLearningoutcome()
    //this.removeLearningOutcome()

    //  console.log( this.selectaddLearningoutcome())
  }
  fillOutcomeDt() {
    this.svcLearningOutcome.GetLearningOutcomesByCourseIdAdmin(this.basicForm.value.CourseSelectList.id).subscribe((result: any) => {
      console.log(result)
      this.dataSource.data = result;
    })
  }

  dialogRefDelete: any;
  delete(data: any) {
    console.log(data);

    this.dialogRefDelete = this.dialog.open(this.confirmationPopup);

    this.dialogRefDelete.afterClosed().subscribe((result: any) => {
      if (result == true) {
        this.svcLearningOutcome.LearningOutcomesDelete(data.id).subscribe((x) => {
          this.fillOutcomeDt();
        })
      }
    });
  }

  formCreation: FormGroup;
  dialogRefForm: any;
  OpenCreatePopup(isNew: boolean, data: any = null) {
    console.log(isNew, data)
    this.formCreation.patchValue({
      id: data?.id || 0,
      Outcome: data?.outcome || '',
      Orderid: data?.orderid || 0,
      Courseid: this.basicForm.controls.CourseSelectList.value.id,
      isEnabled: data?.isEnabled || true

    })
    this.dialogRefForm = this.dialog.open(this.formPopup, {
      width: "500px"
    });


  }
  save(doSave: boolean) {
    console.log(this.formCreation.value)
    //Object.assign(new Person(), this.formInstance.value)
    if (doSave) {

      if (this.formCreation.valid) {
        debugger
        if (!this.formCreation.value || this.formCreation.value.id == 0) {
          this.svcLearningOutcome.LearningOutcomesCreate(this.formCreation.value.Courseid, this.formCreation.value.Outcome, this.formCreation.value.Orderid).subscribe(x => {
            this.fillOutcomeDt();
            this.dialog.closeAll();

          })
        } else if (this.formCreation.value.id > 0) {

          this.svcLearningOutcome.LearningOutcomesUpdate(this.formCreation.value.id, this.formCreation.value.isEnabled, this.formCreation.value.Outcome, this.formCreation.value.Orderid).subscribe(x => {
            this.fillOutcomeDt();
            this.dialog.closeAll();

          })
        }
      }
    } else
      this.dialogRefForm.closeAll();
  }
  toggleState(data: any, state: any) {
    console.log(data, state)
    this.svcLearningOutcome.LearningOutcomesStatusToggle(data.id, state.checked).subscribe(x => {
      this.fillOutcomeDt();
    })
  }

}
