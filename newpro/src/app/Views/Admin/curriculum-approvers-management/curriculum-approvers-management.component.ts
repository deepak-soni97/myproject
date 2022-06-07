import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SvcCurriculumsService, SvcUsersService} from '@AppServices';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-curriculum-approvers-management',
  templateUrl: './curriculum-approvers-management.component.html',
  styleUrls: ['./curriculum-approvers-management.component.scss']
})
export class CurriculumApproversManagementComponent implements OnInit, AfterViewInit  {
  basicForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formDialog', { static: true }) formPopup: TemplateRef<any>;
  @ViewChild('confirmation', { static: true }) confirmationPopup: TemplateRef<any>;
  public enableAddNew=false;
  Curriculum: any = [];
  public displayedColumns: string[] = ['profilePic','userName', 'firstName','lastName','email'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'action'];
  public columnsFilters = {};
  public dataSource: MatTableDataSource<any>;
  public input$ = new Subject<string>();
  public users: any;
  constructor(private fb: FormBuilder, 
    private svcUsers:SvcUsersService,
    private svcCurriculum:SvcCurriculumsService,
    public dialog: MatDialog
  ) {
    this.input$.subscribe((newTerm: any) => {

      this.svcUsers.SearchUserForCurriculumApprovers(newTerm).subscribe((row: any) => {
        this.users = row.map((x: any) => {
          x.displaySearch = ((x.firstName && x.lastName) ? `${x.firstName} ${x.lastName}` : `${x.email || x.userName}`) + `(${x.email || x.userName})`
          return x;
        })
      })
    });
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
      curriculaSelectList: [[], [Validators.required]],
    });
    this.formCreation = new FormGroup({
      "selectedUsers": new FormControl(null, Validators.required)      
    });
    this.svcCurriculum.CurriculumGetAllAdmin().subscribe(result => {
      this.Curriculum = result;
    })
  }
  ApproversGetForCurricula(selectedCurriculaValues: any) {
    this.basicForm.patchValue({ curriculaSelectList: selectedCurriculaValues });
    if(selectedCurriculaValues?.wFstateid > 0){
      this.enableAddNew=true;
      this.fillOutcomeDt();
    }
    else{
      this.enableAddNew=false;
      this.dataSource = new MatTableDataSource<any>();
    }
  }
    fillOutcomeDt() {
      this.svcUsers.GetApproversByStateID(this.basicForm.value.curriculaSelectList.wFstateid).subscribe((result: any) => {
        this.dataSource.data = result;
      })
  }

  dialogRefDelete: any;
  formCreation: FormGroup;
  dialogRefForm: any;
  OpenCreatePopup(isNew: boolean, data: any = null) {
    this.formCreation.patchValue({
      selectedUsers:null
    })
    this.dialogRefForm = this.dialog.open(this.formPopup, {
      width: "500px",
     // height:"400px"
    });
  }
  save(doSave: boolean) {
    //Object.assign(new Person(), this.formInstance.value)
    if (doSave) {

      if (this.formCreation.valid) {
        if (!this.formCreation.value || this.formCreation.value.selectedUsers||this.formCreation.value.selectedUsers.email.lenght>3) {
            this.svcUsers.AddApprover(this.formCreation.value.selectedUsers.email,this.basicForm.value.curriculaSelectList.wFstateid).subscribe(x => {
            this.fillOutcomeDt();
            this.dialog.closeAll();
          })
        } else if (this.formCreation.value.id > 0) {

          // this.svcCurriculum.CurriculumUpdate(this.formCreation.value.id, this.formCreation.value.name, this.formCreation.value.title,this.formCreation.value.orderid).subscribe(x => {
          //   this.fillOutcomeDt();
          //   this.dialog.closeAll();
          // })
          console.log(this.formCreation.value);
        }
      }
    } else{         
      this.dialog.closeAll();
    }
      
  }
  toggleState(data: any, state: any) {
    // this.svcCurriculum.CurriculumStatusToggle(data.id, state.checked).subscribe(x => {
    //   this.fillOutcomeDt();
    // })
  }
  delete(data: any) {
    this.dialogRefDelete = this.dialog.open(this.confirmationPopup);
    this.dialogRefDelete.afterClosed().subscribe((result: any) => {
      if (result == true) {
        this.svcUsers.DeleteApproverByID(data.id).subscribe((x) => {
          this.fillOutcomeDt();
        })
      }
    });
  }

}
