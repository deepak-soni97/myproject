import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SvcUsersService,SvcCurriculumsService,SvcGradesService,SvcSchoolsService} from '@AppServices';
// import { AutoHeightService } from 'ngx-owl-carousel-o/lib/services/autoheight.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent  implements OnInit, AfterViewInit  {
  basicForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formDialog', { static: true }) formPopup: TemplateRef<any>;
  @ViewChild('confirmation', { static: true }) confirmationPopup: TemplateRef<any>;

  public displayedColumns: string[] = ['profilePic','userName', 'userTypeId','firstName','lastName','email','isEnabled'];
  public columnsToDisplay: string[] = [...this.displayedColumns];
  public columnsFilters = {};
  public dataSource: MatTableDataSource<any>;
  public rolesData:any[];
  public schoolData:any[];
  public curriculumData:any[];
  public gradeData:any[];
  constructor(private fb: FormBuilder, 
    private svcUsers:SvcUsersService,
    private svcCurriculum:SvcCurriculumsService,
    private svcGrades:SvcGradesService,
    private svcSchools:SvcSchoolsService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }
  public doFilter = (value: string) => {
    this.svcUsers.SearchUserAdmin(value).subscribe((result: any) => {
      
      this.dataSource.data = result;
    })
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
      "username": new FormControl('', Validators.required),
      "usertype": new FormControl(null, Validators.required), 
      "email": new FormControl('', Validators.required),       
      "firstname": new FormControl('', Validators.required),
      "lastname": new FormControl('', Validators.required),
      "school": new FormControl(null),
      "curriculum": new FormControl(null),
      "grade": new FormControl(null)            
    });
    this.svcCurriculum.CurriculumGetBySchool().subscribe(result => {
      this.curriculumData = result;
    })
    this.svcUsers.GetRoles().subscribe((result:any) => {
      this.rolesData = result.map((result: any) => {
        result.title = result.rolename
        return result;
      })
    })
    this.svcSchools.SchoolsGetAll().subscribe((result:any) => {
      this.schoolData = result.map((result: any) => {
        result.title = result.displayname
        return result;
      })
    })
    this.fillOutcomeDt();
  }
    fillOutcomeDt() {
  }

  dialogRefDelete: any;
  formCreation: FormGroup;
  dialogRefForm: any;
  OpenCreatePopup(isNew: boolean, data: any = null) {
    
    this.formCreation.patchValue({
      username: data?.username || '',
      email:data?.email||'',
      firstname: data?.firstname || '',
      lastname: data?.lastname || '',
      usertype:data?.usertype||null,
      school:data?.school||null,
      curriculum:data?.curriculum||null,
      grade:data?.grade||null
      //orderid:data?.orderid||(this.dataSource.data.length>0)?this.dataSource.data[this.dataSource.data.length-1].orderid+1:1
    })
    this.dialogRefForm = this.dialog.open(this.formPopup, {
      width: "80%",
      height:"70%"
      
    });
    
  }
  UserTypeSelected(selectedUserTypeValue:any){   
    switch (selectedUserTypeValue.id) {
      case 1:
        this.formCreation.controls['school'].addValidators(Validators.required);
        this.formCreation.controls['curriculum'].addValidators(Validators.required);
        this.formCreation.controls['grade'].addValidators(Validators.required);
        break;
        case 2:
          this.formCreation.controls['school'].addValidators(Validators.required);
          this.formCreation.controls['curriculum'].removeValidators(Validators.required);
          this.formCreation.controls['grade'].removeValidators(Validators.required);
        break;
        case 3:
          this.formCreation.controls['school'].removeValidators(Validators.required);
          this.formCreation.controls['curriculum'].removeValidators(Validators.required);
          this.formCreation.controls['grade'].removeValidators(Validators.required);
        break;       
    }
    this.formCreation.patchValue({ usertype: selectedUserTypeValue,
      school:null,curriculum:null,grade:null });
  }
  schoolSelected(selectedSchoolValue:any){
    this.formCreation.patchValue({ school: selectedSchoolValue });
  }
  curriculumSelected(selectedCurriculaValue:any){
    this.formCreation.patchValue({ curriculum: selectedCurriculaValue });
    this.svcGrades.GradesGetByCurriculumId(this.formCreation.value.curriculum.id).subscribe((result:any) => {
      this.gradeData = result.map((result: any) => {
        result.title = result.gradename
        return result;
      })
    })
    this.formCreation.patchValue({ grade: null });
  }
  gradeSelected(selectedGradeValue:any){
    this.formCreation.patchValue({ grade: selectedGradeValue });
  }
  save(doSave: boolean) {
    console.log(this.formCreation.valid);
    
    //Object.assign(new Person(), this.formInstance.value)
    if (doSave) {      
      if (this.formCreation.valid) {        
        if (this.formCreation.value.username) {
          this.svcUsers.RegisterUser(this.formCreation.value).subscribe(x => {
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
          this.svcUsers.ToggleUserEnable(data.email, state.checked).subscribe((x:any) => {
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
