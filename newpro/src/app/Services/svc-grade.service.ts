import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@AppConfigs/environment';
import { DialogConfirmService } from '@AppServices';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SvcGradesService {

  constructor(private http: HttpClient, private svcLoader: DialogConfirmService) { }

  GradesGetMaster(){
    return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Grades.Endpoint}${environment.EndPoints.Grades.methods.GradesGetMaster}`);
  }
  GradesGetByCurriculumId(curriculumId: []) {
   // this.svcLoader.isLoading.next(true);

    let params = new HttpParams();
    params = params.append('curriculaId', curriculumId.toString());
    return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Grades.Endpoint}${environment.EndPoints.Grades.methods.GradesGetByCurriculumId}`, { params: params });
  }

  GradesGetAll() {
    //this.svcLoader.isLoading.next(true);
    return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Grades.Endpoint}${environment.EndPoints.Grades.methods.GradesGetAll}`);
  }
  GradesGetByCurriculumIdAdmin(curriculaId:string): Observable<any> {
    this.svcLoader.isLoading.next(true);
    let params = new HttpParams();
    params = params.append('curriculaId', curriculaId);
    return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Grades.Endpoint}${environment.EndPoints.Grades.methods.GradesGetByCurriculumIdAdmin}`,{ params: params });
  }
  GradesAddNew(grade:any) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("gradenumber", grade.gradenumber)
    form.append("gradename", grade.gradename)
    form.append("curriculaid", grade.curriculaid)
    form.append("isenabled", 'true')
    form.append("orderid", grade.orderid)
    form.append("mastergradeid", grade.mastergradeid)
    return this.http.post(`${environment.ApiEndPoint}${environment.EndPoints.Grades.Endpoint}${environment.EndPoints.Grades.methods.GradesAddNew}`, form);
  }
  GradesUpdate(grade:any) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("id", grade.id)
    form.append("gradenumber", grade.gradenumber)
    form.append("gradename", grade.gradename)
    form.append("curriculaid", grade.curriculaid)
    form.append("isenabled", grade.isenabled)
    form.append("orderid", grade.orderid)
    form.append("mastergradeid", grade.mastergradeid)
    return this.http.put(`${environment.ApiEndPoint}${environment.EndPoints.Grades.Endpoint}${environment.EndPoints.Grades.methods.GradesEdit}`, form);
  }
  GradesStatusToggle(id: string, isenabled: string) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("gradeId", id)
    if(isenabled){
      return this.http.put(`${environment.ApiEndPoint}${environment.EndPoints.Grades.Endpoint}${environment.EndPoints.Grades.methods.GradesEnable}`, form);
    }
    else{
      return this.http.put(`${environment.ApiEndPoint}${environment.EndPoints.Grades.Endpoint}${environment.EndPoints.Grades.methods.GradesDisable}`, form);
    }
  }
}
