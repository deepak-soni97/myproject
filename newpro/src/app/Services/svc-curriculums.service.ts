import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@AppConfigs/environment';
import { Observable } from 'rxjs';
import { DialogConfirmService } from "./dialog-confirm.service";
@Injectable({
  providedIn: 'root'
})
export class SvcCurriculumsService {


  constructor(private http: HttpClient, private svcLoader: DialogConfirmService) { }

  CurriculumGetBySchool(): Observable<any> {
    this.svcLoader.isLoading.next(true);
    return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Curriculum.Endpoint}${environment.EndPoints.Curriculum.methods.CurriculumGetBySchool}`);
  }

  CurriculumGetAll(): Observable<any> {
    this.svcLoader.isLoading.next(true);
    return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Curriculum.Endpoint}${environment.EndPoints.Curriculum.methods.CurriculumGetAll}`);
  }
  CurriculumGetAllAdmin(): Observable<any> {
    this.svcLoader.isLoading.next(true);
    return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Curriculum.Endpoint}${environment.EndPoints.Curriculum.methods.CurriculumGetAllAdmin}`);
  }
  CurriculumAddNew(_id:string, name: string, title: string,order:string) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("name", name)
    form.append("title", title)
    form.append("ordernumber", order)
    return this.http.post(`${environment.ApiEndPoint}${environment.EndPoints.Curriculum.Endpoint}${environment.EndPoints.Curriculum.methods.CurriculaAddNew}`, form);
  }
  CurriculumUpdate(id: string, name: string, title: string,order:string) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("id", id)
    form.append("name", name)
    form.append("title", title)
    form.append("ordernumber", order)
    return this.http.put(`${environment.ApiEndPoint}${environment.EndPoints.Curriculum.Endpoint}${environment.EndPoints.Curriculum.methods.CurriculaEdit}`, form);
  }
  CurriculumStatusToggle(id: string, isenabled: string) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("curriculaId", id)
    if(isenabled){
      return this.http.put(`${environment.ApiEndPoint}${environment.EndPoints.Curriculum.Endpoint}${environment.EndPoints.Curriculum.methods.CurriculaEnable}`, form);
    }
    else{
      return this.http.put(`${environment.ApiEndPoint}${environment.EndPoints.Curriculum.Endpoint}${environment.EndPoints.Curriculum.methods.CurriculaDisable}`, form);
    }
  }


}
