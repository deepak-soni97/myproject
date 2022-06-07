import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@AppConfigs/environment';


@Injectable({
  providedIn: 'root'
})
export class SvcWFManagerService {

  constructor(private svcHttp: HttpClient) { }

  GetWFTaskPendingByWFInstanceID(id: number) {
    let params = new HttpParams();
    params = params.append('wfinstanceID', id);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.WFManager.Endpoint}${environment.EndPoints.WFManager.methods.GetWFTaskPendingByWFInstanceID}`, { params: params });
  }

  GetMyPendingTasks(pageNumber: number, numberOfRowsPerPage: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('numberOfRowsPerPage', numberOfRowsPerPage.toString());

    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.WFManager.Endpoint}${environment.EndPoints.WFManager.methods.GetMyPendingTasks}`, { params: params });
  }

  // CheckOutTask(id:number) {
  //   // let params = new HttpParams();
  //   // params = params.append('taskID', id.toString());
  //   return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.WFManager.Endpoint}${environment.EndPoints.WFManager.methods.CheckOutTask}?taskID=${id}`);
  // }

  public CheckOutTask(id: number) {
    let params = new HttpParams();
    params = params.append('taskID', id.toString());
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.WFManager.Endpoint}${environment.EndPoints.WFManager.methods.CheckOutTask}`, '', { params: params });
  }

  public DiscardCheckOutTask(id: number) {
    let params = new HttpParams();
    params = params.append('taskID', id.toString());
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.WFManager.Endpoint}${environment.EndPoints.WFManager.methods.DiscardCheckOutTask}`, '', { params: params });
  }

  public GetActionsforWFState(stateID: number) {

    let params = new HttpParams();
    params = params.append('stateID', stateID.toString());
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.WFManager.Endpoint}${environment.EndPoints.WFManager.methods.GetActionsforWFState}`, '', { params: params });
  }


  public GetAllMyTasks() {
    let params = new HttpParams();
    params = params.append('numberOfRowsPerPage', '10');
    params = params.append('pageNumber', '1');
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.WFManager.Endpoint}${environment.EndPoints.WFManager.methods.GetAllMyTasks}`, { params: params });
  }

  public GetCompletedWFTaskByWFInstanceID(wfinstanceID: number) {
    let params = new HttpParams();
    params = params.append('wfinstanceID', wfinstanceID.toString());
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.WFManager.Endpoint}${environment.EndPoints.WFManager.methods.GetCompletedWFTaskByWFInstanceID}`, { params });
  }

}
