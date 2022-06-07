import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SvcSchoolsService, SvcUsersService} from '@AppServices';

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

  Schools: any = [];
  public displayedColumns: string[] = ['profilePic','userName', 'firstName','lastName','email'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'action'];
  public columnsFilters = {};
  public dataSource: MatTableDataSource<any>;
  constructor(private fb: FormBuilder, 
    private svcUsers:SvcUsersService,
    private svcSchools:SvcSchoolsService,
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
      schoolSelectList: [[], [Validators.required]],
    });
    this.formCreation = new FormGroup({
      "email": new FormControl('', Validators.required)      
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
      this.fillOutcomeDt();
    } else{
      this.dataSource = new MatTableDataSource<any>();
    }
  }
    fillOutcomeDt() {
      this.svcUsers.GetApproversByStateID(this.basicForm.value.schoolSelectList.schoolapprovalwfstateId).subscribe((result: any) => {
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
      profilePic:data?.profilePic||'../../assets/Images/user-icon.jpg',
      name: data?.name || '',
      title: data?.title || '',
      orderid:data?.orderid||(this.dataSource.data.length>0)?this.dataSource.data[this.dataSource.data.length-1].orderid+1:1
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
          // this.svcCurriculum.CurriculumAddNew(this.formCreation.value.id, this.formCreation.value.name, this.formCreation.value.title,this.formCreation.value.orderid).subscribe(x => {
          //   this.fillOutcomeDt();
          //   this.dialog.closeAll();
          // })
        } else if (this.formCreation.value.id > 0) {

          // this.svcCurriculum.CurriculumUpdate(this.formCreation.value.id, this.formCreation.value.name, this.formCreation.value.title,this.formCreation.value.orderid).subscribe(x => {
          //   this.fillOutcomeDt();
          //   this.dialog.closeAll();
          // })
        }
      }
    } else{         
      this.dialog.closeAll();
    }
      
  }
  toggleState(data: any, state: any) {
    console.log(data, state)
    // this.svcCurriculum.CurriculumStatusToggle(data.id, state.checked).subscribe(x => {
    //   this.fillOutcomeDt();
    // })
  }
  delete(data: any) {
    console.log(data);
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
