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
}
