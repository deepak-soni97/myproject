
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@AppConfigs/environment';
import { DialogConfirmService } from '@AppServices';


@Injectable({
  providedIn: 'root'
})
export class SvcSubjectsService {

  constructor(private http: HttpClient, private svcLoader: DialogConfirmService) { }

  SubjectsGetAll() {
   // this.svcLoader.isLoading.next(true);
    return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Subjects.Endpoint}${environment.EndPoints.Subjects.methods.SubjectsGetAll}`);
  }
  SubjectsGetAllAdmin() {
    // this.svcLoader.isLoading.next(true);
     return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Subjects.Endpoint}${environment.EndPoints.Subjects.methods.SubjectsGetAllAdmin}`);
   }
  SubjectGetByGrades(gradeIds: any) {
    //this.svcLoader.isLoading.next(true);
    let params = new HttpParams();

    if (gradeIds.length > 0) {
      params = params.append(`gradeIds`, gradeIds.join(','));

    }else {
      
      params = params.append(`gradeIds`, gradeIds.toString());
    }


    return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Subjects.Endpoint}${environment.EndPoints.Subjects.methods.SubjectGetByGrades}`, { params: params });
  }
  SubjectAdd(subject:any,icon:any) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("name", subject.name)
    form.append("title", subject.title)
    form.append("orderid", subject.orderid)
    form.append("icon.IconImage", icon)
    return this.http.post(`${environment.ApiEndPoint}${environment.EndPoints.Subjects.Endpoint}${environment.EndPoints.Subjects.methods.SubjectAdd}`, form);
  }
  SubjectUpdate(subject:any,icon:any) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("id", subject.id)
    form.append("name", subject.name)
    form.append("title", subject.title)
    form.append("orderid", subject.orderid)
    form.append("iconurl", subject.iconurl)
    form.append("icon.IconImage", icon)
    return this.http.put(`${environment.ApiEndPoint}${environment.EndPoints.Subjects.Endpoint}${environment.EndPoints.Subjects.methods.SubjectUpdate}`, form);
  }
  SubjectStatusToggle(id: string, isenabled: boolean) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append(`subjectId`,id);
    form.append(`isEnabled`,isenabled.toString());
    return this.http.put(`${environment.ApiEndPoint}${environment.EndPoints.Subjects.Endpoint}${environment.EndPoints.Subjects.methods.SubjectToggleEnable}`, form);
   
  }
}
