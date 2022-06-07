import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@AppConfigs/environment';
import { DialogConfirmService } from '@AppServices';

@Injectable({
  providedIn: 'root'
})
export class SvcUsersService {

  constructor(private svcHttp: HttpClient, private svcLoader: DialogConfirmService) { }

  TeachersGetAll() {
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.TeachersGetAll}`);
  }
  // public UserProfileGet() {
  //   this.svcLoader.isLoading.next(true);
  //   return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.UserProfileGet}`);
  // }
  // public UpdateTeacherProfile(formdata:any) {
  //   return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.UpdateTeacherProfile}`, formdata);

  // }

  public UserProfileGet() {
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.UserProfileGet}`);
  }
  public UpdateTeacherProfile(formdata: any) {
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.UpdateTeacherProfile}`, formdata);
  }
  public TeacherProfileGet(teacherId: number) {
    let params = new HttpParams();
    params = params.append('teacherId', teacherId.toString());
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.TeacherProfileGet}`, { params: params });
  }
  public ChangePassword(currentPassword: string, newPassword: string) {
    let params = new FormData();
    params.append('currentPassword', currentPassword.toString());
    params.append('newPassword', newPassword.toString());
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.ChangePassword}`, params);
  }
  public UpdateStudentProfile(formdata: any) {
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.UpdateStudentProfile}`, formdata);
  }
  SearchUserAdmin(searchtxt:string){
    let params = new HttpParams();
    params = params.append('searchText', searchtxt);
   // this.svcLoader.isLoading.next(true);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.SearchUserAdmin}`, { params: params });
  }
  SearchUser(searchtxt:string){
    let params = new HttpParams();
    params = params.append('searchText', searchtxt);
   // this.svcLoader.isLoading.next(true);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.SearchUser}`, { params: params });
  }
  SearchUserForCurriculumApprovers(searchtxt:string){
    let params = new HttpParams();
    params = params.append('searchText', searchtxt);
   // this.svcLoader.isLoading.next(true);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.SearchUserForCurriculumApprovers}`, { params: params });
  }
  SearchUserForSchoolApprovers(searchtxt:string,schoolId:number){
    let params = new HttpParams();
    params = params.append('searchText', searchtxt);
    params = params.append('schoolId', schoolId);
   // this.svcLoader.isLoading.next(true);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.SearchUserForSchoolApprovers}`, { params: params });
  }
  GetApproversByStateID(wfstateId:number){
    let params = new HttpParams();
    params = params.append('wfstateId', wfstateId);
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.GetApproversByStateID}`, { params: params });
  }
  DeleteApproverByID(approverId:number){
    let params = new HttpParams();
    params=params.append('approverId', approverId.toString());
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.delete(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.DeleteApproverByID}`, { params: params });
  }
  ToggleUserEnable(userId:number,state:boolean){
    let params = new FormData();
    params.append('useremail', userId.toString());
    params.append('state', state.toString());
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.put(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.ToggleUserEnable}`, params);
  }
  AddApprover(userEmail:string,stateId:number){
    let params = new FormData();
    params.append('userEmail', userEmail);
    params.append('stateId', stateId.toString());
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.AddApprover}`, params);
  }
  GetRoles(){
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.GetRoles}`);
  }
  RegisterUser(details:any){
    let params = new FormData();
    params.append('Username', details.username);
    params.append('Email', details.email);
    params.append('UserTypeId', details.usertype.id);
    params.append('Firstname', details.firstname);
    params.append('Lastname', details.lastname);
    if(details.school && details.school.id){
      params.append('SchoolId', details.school.id);
    }
    if(details.curriculum && details.curriculum.id){
    params.append('CurriculaId', details.curriculum.id);
    }
    if(details.grade && details.grade.id){
    params.append('GradeId', details.grade.id);
    }
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.RegisterUser}`, params);
  }
}
