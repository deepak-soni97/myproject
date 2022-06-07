import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@AppConfigs/environment';
import { DialogConfirmService } from './dialog-confirm.service';

@Injectable({
  providedIn: 'root'
})
export class SvcLearningOutcomesService {

  constructor(private svcHttp: HttpClient, private svcLoader: DialogConfirmService) { }
  GetLearningOutcomesByCourseIdAdmin(courseId: string) {
    this.svcLoader.isLoading.next(true);
    let params = new HttpParams();
    params = params.append('courseId', courseId);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.LearningOutcomes.Endpoint}${environment.EndPoints.LearningOutcomes.methods.GetLearningOutcomesByCourseIdAdmin}`, { params: params });
  }
  GetLearningOutcomesByCourseId(courseId: string) {
    this.svcLoader.isLoading.next(true);
    let params = new HttpParams();
    params = params.append('courseId', courseId);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.LearningOutcomes.Endpoint}${environment.EndPoints.LearningOutcomes.methods.GetLearningOutcomesByCourseId}`, { params: params });
  }
  LearningOutcomesCreate(courseId: string, Outcome: string, Orderid: string) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("learningoutcomes[0].Courseid", courseId)
    form.append("learningoutcomes[0].Outcome", Outcome)
    form.append("learningoutcomes[0].Orderid", Orderid)
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.LearningOutcomes.Endpoint}${environment.EndPoints.LearningOutcomes.methods.AddLearningOutcomes}`, form);
  }
  LearningOutcomesUpdate(id: string, isenabled: string, Outcome: string, Orderid: string) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("learningoutcomes[0].isenabled", isenabled)
    form.append("learningoutcomes[0].Outcome", Outcome)
    form.append("learningoutcomes[0].Orderid", Orderid)
    form.append("learningoutcomes[0].id", id)
    return this.svcHttp.put(`${environment.ApiEndPoint}${environment.EndPoints.LearningOutcomes.Endpoint}${environment.EndPoints.LearningOutcomes.methods.EditLearningOutcomes}`, form);
  }
  LearningOutcomesDelete(id: string) {
    this.svcLoader.isLoading.next(true);
    let form = new HttpParams();
    form = form.append("learningOutcomeId", id)
    return this.svcHttp.delete(`${environment.ApiEndPoint}${environment.EndPoints.LearningOutcomes.Endpoint}${environment.EndPoints.LearningOutcomes.methods.DeleteLearningOutcome}`, { params: form });
  }
  LearningOutcomesStatusToggle(id: string, isenabled: string) {
    this.svcLoader.isLoading.next(true);
    let form = new FormData();
    form.append("isenabled", isenabled)
    form.append("id", id)
    return this.svcHttp.put(`${environment.ApiEndPoint}${environment.EndPoints.LearningOutcomes.Endpoint}${environment.EndPoints.LearningOutcomes.methods.ToggleLearningOutcomesEnable}`, form);
  }
}
