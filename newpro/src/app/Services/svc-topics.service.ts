import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITopicDetailModel, ITopicsListItemModel, ITopicViewsListItemModel } from '@AppModels';
import { Observable, Observer } from 'rxjs';
import { LatestTopics } from "@AppConfigs/ConstantDatas"
import { environment } from '@AppConfigs/environment';
import { DialogConfirmService } from '@AppServices';
@Injectable({
  providedIn: 'root'
})
export class SvcTopicsService {

  constructor(private svcHttp: HttpClient, private svcLoader: DialogConfirmService) { }

  public GetLatestTopics = (): Observable<ITopicsListItemModel[]> => {


    return new Observable((observer: Observer<ITopicsListItemModel[]>) => {
      observer.next(LatestTopics);
      observer.complete();
    });
  }

  public GetTopicSocialDetail = (TopicId: number): Observable<ITopicViewsListItemModel> => {

    return new Observable((observer: Observer<ITopicViewsListItemModel>) => {
      observer.next({
        "AverageRating": 3,
        "ID": 106,
        "Id": 106,
        "Title": "376",
        "TotalComments": 0,
        "TotalLikes": 0,
        "TotalRatings": 1,
        "TotalSaves": 0,
        "TotalShares": 0,
        "TotalViews": 62,
      });
      observer.complete();
    });
  }


  public getTopicItembyParentID = (TopicId: number): Observable<ITopicDetailModel | undefined> => {

    return new Observable((observer: Observer<ITopicDetailModel | undefined>) => {
      observer.next(undefined);
      observer.complete();
    });
  }



  public TopicCreate(obj: any) {
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicCreate}`, obj);
  }

  public GetTopicCreate(obj: any) {
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicCreate}`, obj);
  }


  public TopicGetById(id: number) {
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicGetById}${id}`);
  }

  public TopicGetStats(id: number) {
    this.svcLoader.isLoading.next(true);
    let params = new HttpParams();
    params = params.append('topicId', id.toString());
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicGetStats}`, { params: params });
  }

  public TopicViewed(id: number) {
    //  this.svcLoader.isLoading.next(true);

    const formdata = new FormData();
    formdata.append('topicId', id.toString());
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicViewed}`, formdata);
  }

  public TopicRate(obj: object) {
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicRate}`, obj)
  }

  public TopicRateGetForUser(id: number) {
    //this.svcLoader.isLoading.next(true);
    let params = new HttpParams();
    params = params.append('topicId', id.toString());
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicRateGetForUser}`, { params: params });
  }

  public TopicLike(topicId: number) {
    const formdata = new FormData();
    formdata.append('topicId', topicId.toString());

    this.svcLoader.isLoading.next(true);
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicLike}`, formdata)
  }

  public TopicDislike(topicId: number) {
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.delete(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicDislike}/${topicId.toString()}`);
  }

  public TopicLikeCheckForUser(id: number) {
    //this.svcLoader.isLoading.next(true);
    let params = new HttpParams();
    params = params.append('topicId', id.toString());
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicLikeCheckForUser}`, { params: params });
  }

  public TopicSave(topicId: number) {
    const formdata = new FormData();
    formdata.append('topicId', topicId.toString());

    this.svcLoader.isLoading.next(true);
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicSave}`, formdata)
  }

  public TopicUnSave(topicId: number) {
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.delete(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicUnSave}/${topicId.toString()}`,)
  }

  public TopicSaveCheckForUser(id: number) {
    // this.svcLoader.isLoading.next(true);
    let params = new HttpParams();
    params = params.append('topicId', id.toString());
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicSaveCheckForUser}`, { params: params });
  }

  public TopicGetSavedTopicsForUser() {
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicGetSavedTopicsForUser}`);
  }
  public TopicUpdate(topicId: number, obj: any) {
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.put(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicUpdate}/${topicId}`, obj);
  }

  public TopicParentCommentGet(topicId: number) {
    this.svcLoader.isLoading.next(true);
    let params = new HttpParams();
    params = params.append('topicId', topicId.toString());
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicGetParentComments}`, { params: params });
  }
  public TopicChildCommentGet(parentCommentId: number) {
    this.svcLoader.isLoading.next(true);
    let params = new HttpParams();
    params = params.append('parentCommentId', parentCommentId.toString());
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicGetChildComments}`, { params: params });
  }
  public TopicCommentSubmit(topicId: number, comment: string, parentCommentId: number) {
    const formdata = new FormData();
    formdata.append('topicId', topicId.toString());
    formdata.append('comment', comment);
    if (parentCommentId > 0)
      formdata.append('parentCommentId', parentCommentId.toString());

    this.svcLoader.isLoading.next(true);
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicCommentSubmit}`, formdata);
  }
  public TopicAttachmentCreate(formdata: any) {
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicAttachmentCreate}`, formdata,
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  public TopicAttachmentsGetByTopic(topicId: number) {
    //this.svcLoader.isLoading.next(true);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicAttachmentsGetByTopic}/${topicId}`);

  }
  public SubmitTopicTask(topicID: number, taskID: number, actionTakenID: number, commentData: any) {
    this.svcLoader.isLoading.next(true);
    let data = new FormData();
    data.append("taskID", taskID.toString());
    data.append("topicId", topicID.toString());
    data.append("actionTakenID", actionTakenID.toString());
    if (commentData) {
      Object.keys(commentData).map(row => {
        data.append(row, commentData[row]);

      })
    }
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.SubmitTopicTask}`, data);
  }
  public TopicGetAllTopicsByUserId(pageNumber: number, numberOfRowsPerPage: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('numberOfRowsPerPage', numberOfRowsPerPage.toString());

    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicGetAllTopicsByUserId}`, { params: params });

  }
  public TopicsStatsGetByUserId() {

    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicsStatsGetByUserId}`);

  }
  public TopicsToggleActiveStatus(topicId: number) {
    let params = new HttpParams();
    params = params.append('topicId', topicId.toString());
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicsToggleActiveStatus}`, { params: params });
  }
  public TopicGetByParentId(id: number) {
    this.svcLoader.isLoading.next(true);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicGetByParentId}${id}`);
  }


  public TopicShare(topicID: string, emails: any) {
    this.svcLoader.isLoading.next(true);
    let data = new FormData();
    data.append("topicId", topicID.toString());
    emails.map((item: any, index: number) => {
      data.append(`userEmails[${index}]`, item);
    })
    return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Topics.Endpoint}${environment.EndPoints.Topics.methods.TopicShare}`, data);
  }
}