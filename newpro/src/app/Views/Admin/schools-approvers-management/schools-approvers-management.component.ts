import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SvcSchoolsService, SvcUsersService} from '@AppServices';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-schools-approvers-management',
  templateUrl: './schools-approvers-management.component.html',
  styleUrls: ['./schools-approvers-management.component.scss']
})
export class SchoolsApproversManagementComponent implements OnInit, AfterViewInit  {
  basicForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formDialog', { static: true }) formPopup: TemplateRef<any>;
  @ViewChild('confirmation', { static: true }) confirmationPopup: TemplateRef<any>;
  public enableAddNew=false;
  Schools: any = [];
  public displayedColumns: string[] = ['profilePic','userName', 'firstName','lastName','email'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'action'];
  public columnsFilters = {};
  public dataSource: MatTableDataSource<any>;
  public input$ = new Subject<string>();
  public users: any;
  constructor(private fb: FormBuilder, 
    private svcUsers:SvcUsersService,
    private svcSchools:SvcSchoolsService,
    public dialog: MatDialog
  ) {
    this.input$.subscribe((newTerm: any) => {

    this.svcUsers.SearchUserForSchoolApprovers(newTerm,this.basicForm.value.schoolSelectList.id).subscribe((row: any) => {
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
      schoolSelectList: [[], [Validators.required]],
    });
    this.formCreation = new FormGroup({
      "selectedUsers": new FormControl(null, Validators.required)         
    });
    this.svcSchools.SchoolsGetAll().subscribe((result:any) => {
      this.Schools = result.map((result: any) => {
        result.title = result.displayname
        return result;
      });
    })
  }
  ApproversGetForSchool(selectedSchoolsValues: any) {
    this.basicForm.patchValue({ schoolSelectList: selectedSchoolsValues });
    if(selectedSchoolsValues?.schoolapprovalwfstateId > 0){
      this.enableAddNew=true;
      this.fillOutcomeDt();
    } else{
      this.enableAddNew=false;
      this.dataSource = new MatTableDataSource<any>();
    }
  }
    fillOutcomeDt() {
      this.svcUsers.GetApproversByStateID(this.basicForm.value.schoolSelectList.schoolapprovalwfstateId).subscribe((result: any) => {
        
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
      width: "500px"
    });
    
  }
  save(doSave: boolean) {
    
    //Object.assign(new Person(), this.formInstance.value)
    if (doSave) {

      if (this.formCreation.valid) {
        debugger
          if (!this.formCreation.value || this.formCreation.value.selectedUsers||this.formCreation.value.selectedUsers.email.lenght>3) {
            this.svcUsers.AddApprover(this.formCreation.value.selectedUsers.email,this.basicForm.value.schoolSelectList.schoolapprovalwfstateId).subscribe(x => {
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
    
    // this.svcCurriculum.CurriculumStatusToggle(data.id, state.checked).subscribe(x => {
    //   this.fillOutcomeDt();
    // })
  }
  delete(data: any) {
    ;
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
