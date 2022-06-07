import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@AppConfigs/environment';
import { DialogConfirmService } from '@AppServices';

@Injectable({
  providedIn: 'root'
})
export class SvcSchoolsService {

  constructor(private http: HttpClient, private svcLoader: DialogConfirmService) { }

  SchoolsGetAll() {
    this.svcLoader.isLoading.next(true);

    return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Schools.Endpoint}${environment.EndPoints.Schools.methods.SchoolsGetAll}`);
  }
  SchoolAddNew(schoolId: string, name: string, displayName: string) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("name", name);
    form.append("displayname", displayName);
    return this.http.post(`${environment.ApiEndPoint}${environment.EndPoints.Schools.Endpoint}${environment.EndPoints.Schools.methods.SchoolAddNew}`,form);
  }
  SchoolUpdate(schoolId: string, name: string, displayName: string) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("id", schoolId)
    form.append("name", name)
    form.append("displayname", displayName)
    form.append("Isenabled", 'true')
    return this.http.put(`${environment.ApiEndPoint}${environment.EndPoints.Schools.Endpoint}${environment.EndPoints.Schools.methods.SchoolUpdate}`,form);
  }
}
