import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curriculums } from '@AppConfigs/ConstantDatas';
import { ISPListBaseModel } from '@AppModels';
import { Observable, Observer } from 'rxjs';
import { environment } from '@AppConfigs/environment';
import { DialogConfirmService } from './dialog-confirm.service';


@Injectable({
  providedIn: 'root'
})
export class SvcMasterDataService {

  constructor(private svcHttp: HttpClient, private svcLoader: DialogConfirmService) { }
  public CurriculumsGet = (): Observable<ISPListBaseModel[]> => {

    return new Observable((observer: Observer<ISPListBaseModel[]>) => {
      observer.next(Curriculums);
      observer.complete();
    });
  }
  // public GetSchoolLevelApprovers = (): Observable<any> => {
  //   return new Observable((observer: Observer<any>) => {
  //     observer.next([
  //       {
  //         "odata.type": "SP.Data.SchoolApproversListItem",
  //         "odata.id": "1ea8afda-ad53-40dc-9539-0b615b3fa70a",
  //         "odata.etag": "\"19\"",
  //         "odata.editLink": "Web/Lists(guid'594b3139-79f0-4286-a6c7-25b046efb4bc')/Items(56)",
  //         "Approvers@odata.navigationLinkUrl": "Web/Lists(guid'594b3139-79f0-4286-a6c7-25b046efb4bc')/Items(56)/Approvers",
  //         "Approvers": [
  //           {
  //             "odata.type": "SP.Data.UserInfoItem",
  //             "odata.id": "ceec431b-fea5-4d4a-bbaa-0c46beba621e",
  //             "EMail": "kanaga.finesse@Gemseducation.com"
  //           }
  //         ],
  //         "Id": 56,
  //         "Title": "PVS",
  //         "SchoolName": "Phoenix Virtual School",
  //         "ID": 56
  //       }
  //     ]);
  //     observer.complete();
  //   })
  // }

  // public GetCurriculumLevelApprovers = (ID: number): Observable<any> => {
  //   return new Observable((observer: Observer<any>) => {
  //     observer.next([
  //       {
  //         "odata.type": "SP.Data.CurriculumApproversListItem",
  //         "odata.id": "97e9e33c-9c11-48e6-b0be-68bef89a1333",
  //         "odata.etag": "\"2\"",
  //         "odata.editLink": "Web/Lists(guid'661721bc-ec1c-4e87-8541-f9d8028f4850')/Items(15)",
  //         "Approvers@odata.navigationLinkUrl": "Web/Lists(guid'661721bc-ec1c-4e87-8541-f9d8028f4850')/Items(15)/Approvers",
  //         "Approvers": [
  //           {
  //             "odata.type": "SP.Data.UserInfoItem",
  //             "odata.id": "76b772b8-03e5-420a-b6cd-0136c50aee19",
  //             "EMail": "kanaga.finesse@Gemseducation.com"
  //           },
  //           {
  //             "odata.type": "SP.Data.UserInfoItem",
  //             "odata.id": "b9ab3a23-7bd6-4f40-9692-2709ae532fbb",
  //             "EMail": "patricia.calvar@Gemseducation.com"
  //           }
  //         ],
  //         "Curriculum@odata.navigationLinkUrl": "Web/Lists(guid'661721bc-ec1c-4e87-8541-f9d8028f4850')/Items(15)/Curriculum",
  //         "Curriculum": {
  //           "odata.type": "SP.Data.CurriculumListItem",
  //           "odata.id": "fe4c7f75-a7bd-4ede-965c-d4f979af0f97",
  //           "ID": 9,
  //           "Title": "GCSE"
  //         },
  //         "Id": 15,
  //         "Title": "gcse",
  //         "ID": 15
  //       }
  //     ]);
  //     observer.complete();
  //   })
  // }

  public GetCurriculumsByRequestStatusID = (): Observable<ISPListBaseModel[]> => {
    return new Observable((observer: Observer<ISPListBaseModel[]>) => {
      observer.next(Curriculums);
      observer.complete();
    });
  }
  public MasterAddTagSearch(keyword: any) {
    let params = new HttpParams();
    params = params.append('keyword', keyword.toString());
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.masterData.Endpoint}${environment.EndPoints.masterData.methods.MasterTagSearch}`, { params: params })
  }
  public MasterTagGetLatest(numOfTags: any) {
    let params = new HttpParams();
    params = params.append('numOfTags', numOfTags.toString());
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.masterData.Endpoint}${environment.EndPoints.masterData.methods.MasterTagGetLatest}`, { params: params })
  }
  public DownloadFileAsync(fileId: number) {
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.DocumentsManagement.Endpoint}${environment.EndPoints.DocumentsManagement.methods.DownloadFileAsync}/${fileId}`,
      {
        responseType: 'blob'
      }
    )
  }
  public FileDelete(attachmentId: number) {
    return this.svcHttp.delete(`${environment.ApiEndPoint}${environment.EndPoints.DocumentsManagement.Endpoint}${environment.EndPoints.DocumentsManagement.methods.DeleteFileAsync}/${attachmentId}`)
  }

  public FilePreviewUrlGet(fileName: string) {
    this.svcLoader.isLoading.next(true);
    let params = new HttpParams();
    params = params.append('fileName', fileName);
    return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.DocumentsManagement.Endpoint}${environment.EndPoints.DocumentsManagement.methods.GetFileUrl}`, {
      params: params,
      responseType: 'text'

    });
  }
}