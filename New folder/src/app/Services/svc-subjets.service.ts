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
}
