import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@AppConfigs/environment';
import { WebConfig } from '@AppConfigs/WebConfig';
import { DialogConfirmService, SharedServiceService, SvcLocalStorageService } from '@AppServices';

@Injectable({
  providedIn: 'root'
})
export class SvcAuthenticationService {

  constructor(private http: HttpClient, private svcLoader: DialogConfirmService, private svcStorage: SvcLocalStorageService, private svcShared: SharedServiceService) { }

  AuthenticateUser(encModel: string) {
    this.svcLoader.isLoading.next(true);
    let data = new FormData();
    data.append("encModel", encModel)

    return this.http.post(`${environment.ApiEndPoint}${environment.EndPoints.Login}`, data)
  }
  RegisterStudent(userName: string, password: string, schoolCode: string) {
    this.svcLoader.isLoading.next(true);

    return this.http.post(`${environment.ApiEndPoint}${environment.EndPoints.RegistrationStudent}`, {
      UserEmail: userName,
      Password: password,
      SchoolCode: schoolCode,
      UserType: "internal"
    })
  }

  RegisterTeacher(userName: string, password: string, schoolCode: string) {
    this.svcLoader.isLoading.next(true);

    return this.http.post(`${environment.ApiEndPoint}${environment.EndPoints.RegisterTeacher}`, {
      UserEmail: userName,
      Password: password,
      SchoolCode: schoolCode,
      UserType: "internal"
    })
  }

  RefreshToken() {
    this.svcLoader.isLoading.next(true);
    return this.http.post(`${environment.ApiEndPoint}${environment.EndPoints.RefreshToken}`, {});
  }
  Logout() {
    this.svcLoader.isLoading.next(true);
    this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Users.Endpoint}${environment.EndPoints.Users.methods.LogoutUser}`).subscribe(row => {

    })
    this.svcStorage.DeleteAll();
    this.svcShared.isLoggedOutSet(true);
    window.location.href = "/" + WebConfig.PagesName.LoginPage;
  }
  ForgotPassword(strEmail: string) {
    this.svcLoader.isLoading.next(true);
    return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.ForgotPassword}`, {
      params: {
        userEmail: strEmail
      }
    })
  }
  ResetPassword(newPassword: string, token: string) {
    this.svcLoader.isLoading.next(true);
    let data = new FormData();
    data.append("token", token)
    data.append("newPassword", newPassword)
    return this.http.post(`${environment.ApiEndPoint}${environment.EndPoints.ResetPassword}`, data)
  }
}
