import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@AppConfigs/environment';
import { DialogConfirmService } from '@AppServices';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SvcCoursesService {

  constructor(private http: HttpClient, private svcLoader: DialogConfirmService) { }
  CoursesGetByGradeSubjectId(gradeId: number[], subjectId: number) {
    let params = new HttpParams();
    params = params.append('gradeIds', gradeId.toString());
    params = params.append('subjectId', subjectId.toString());
    return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Courses.Endpoint}${environment.EndPoints.Courses.methods.CoursesGetByGradesSubjectId}`, { params: params })
  }
  
  CoursesGetByGradeId(gradeId: number) {
    let params = new HttpParams();
    params = params.append('gradeId', gradeId.toString());
    return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Courses.Endpoint}${environment.EndPoints.Courses.methods.CoursesGetByGradeId}`, { params: params })
  }
  CourseLearningOutGetByCourseId(courseId : number)  {
    let params = new HttpParams();
    params = params.append('courseId', courseId.toString());
    return this.http.get( `${environment.ApiEndPoint}${environment.EndPoints.courseId.Endpoint}${environment.EndPoints.courseId.methods.CourseLearningOutcomeGetByCourseId}`,  { params: params });
  }
  CoursesGetByGradeAndSubjectIdAdmin(gradeId:number,subjectId:number): Observable<any> {
    this.svcLoader.isLoading.next(true);
    let params = new HttpParams();
    params = params.append('gradeId', gradeId);
    params = params.append('subjectId', subjectId);
    return this.http.get(`${environment.ApiEndPoint}${environment.EndPoints.Courses.Endpoint}${environment.EndPoints.Courses.methods.CoursesGetByGradeAndSubjectIdAdmin}`,{ params: params });
  }
 CoursesAddNew(course:any,subjectId:string) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("coursename", course.coursename)
    form.append("coursegroupid", course.coursegroupid)
    form.append("gradeid", course.gradeid)
    form.append("isenabled", 'true')
    form.append("orderId", course.orderId)
    form.append("subjectId", subjectId)
    return this.http.post(`${environment.ApiEndPoint}${environment.EndPoints.Courses.Endpoint}${environment.EndPoints.Courses.methods.CoursesAddNew}`, form);
  }
  CoursesUpdate(course:any) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("id", course.id)
    form.append("coursename", course.coursename)
    form.append("coursegroupid", course.coursegroupid)
    form.append("gradeid", course.gradeid)
    form.append("isenabled", 'true')
    form.append("orderId", course.orderId)    
    return this.http.put(`${environment.ApiEndPoint}${environment.EndPoints.Courses.Endpoint}${environment.EndPoints.Courses.methods.CoursesUpdate}`, form);
  }
  CoursesStatusToggle(id: string, isenabled: string) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("courseId", id)
    if(isenabled){
      return this.http.put(`${environment.ApiEndPoint}${environment.EndPoints.Courses.Endpoint}${environment.EndPoints.Courses.methods.CourseEnable}`, form);
    }
    else{
      return this.http.put(`${environment.ApiEndPoint}${environment.EndPoints.Courses.Endpoint}${environment.EndPoints.Courses.methods.CourseDisable}`, form);
    }
  }
}
