import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@AppConfigs/environment';
import { DialogConfirmService } from '@AppServices';

@Injectable({
    providedIn: 'root'
})
export class SvcTopicSearchService {

    constructor(private svcHttp: HttpClient, private svcLoader: DialogConfirmService) { }

    public SearchTopic(formdata: any) {
        this.svcLoader.isLoading.next(true);
        return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Search.Endpoint}${environment.EndPoints.Search.methods.SearchTopics}`, formdata);
    }
    public FindRelatedTopics(formdata: any) {
        formdata.append("PageRowsLimit", "5");
        formdata.append("OrderByField", "3");
        formdata.append("OrderDirection", "2");
        formdata.append("PageNumber", "1");
        this.svcLoader.isLoading.next(true);
        return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Search.Endpoint}${environment.EndPoints.Search.methods.FindRelatedTopics}`, formdata);
    }
    public GetTeacherTopics(teacherId: number, numberofRecord: number,topicId:number) {
        var formdata = new FormData();
        formdata.append(`Contributors[0]`, teacherId.toString());
        formdata.append("PageRowsLimit", numberofRecord.toString());
        formdata.append("OrderByField", "1");
        formdata.append("OrderDirection", "Descending");
        formdata.append("PageNumber", "1");
        formdata.append(`ExcludedTopicIds[0]`, topicId.toString())  

        return this.SearchTopic(formdata)
    }    
    public LatestTopicGet(numberOfRecords: number) {
        const formdata = new FormData();
        formdata.append("PageRowsLimit", numberOfRecords.toString())
        formdata.append("OrderByField", "1")
        formdata.append("OrderDirection", "Descending")
        formdata.append("IsFeatured", false.toString())
        formdata.append("PageNumber", "1");

        return this.SearchTopic(formdata)
    }
    public PopularTopicGet(numberOfRecords: number) {
        const formdata = new FormData();
        formdata.append("PageRowsLimit", numberOfRecords.toString())
        formdata.append("OrderByField", "3")
        formdata.append("OrderDirection", "Descending")
        formdata.append("PageNumber", "1");

        return this.SearchTopic(formdata)
    }
    public FeaturedTopicGet(numberOfRecords: number) {
        const formdata = new FormData();
        formdata.append("PageRowsLimit", numberOfRecords.toString())
        formdata.append("OrderByField", "1")
        formdata.append("OrderDirection", "Descending")
        formdata.append("IsFeatured", true.toString())
        //formdata.append("ToPublishedDate", (new Date()).toString())
        formdata.append("PageNumber", "1");

        return this.SearchTopic(formdata)
    }

    public GetContributionsCountbyYear() {
        return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Search.Endpoint}${environment.EndPoints.Search.methods.GetContributionsCountbyYear}`);
    }
    public GetContributionsCountbyMonth() {
        return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Search.Endpoint}${environment.EndPoints.Search.methods.GetContributionsCountbyMonth}`);
    }
    public GetContributionsCountbyCurrentWeek() {
        return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Search.Endpoint}${environment.EndPoints.Search.methods.GetContributionsCountbyCurrentWeek}`);
    }
    public GetContributionsCountbyPreviousWeek() {
        return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Search.Endpoint}${environment.EndPoints.Search.methods.GetContributionsCountbyPreviousWeek}`);
    }
    public GetContributionsCountbySchool() {
        return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Search.Endpoint}${environment.EndPoints.Search.methods.GetContributionsCountbySchool}`);
    }
    public GetContributionsCountbyCurricula() {
        return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Search.Endpoint}${environment.EndPoints.Search.methods.GetContributionsCountbyCurricula}`);
    }
    public GetContributionsCountbyUser() {
        return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Search.Endpoint}${environment.EndPoints.Search.methods.GetContributionsCountbyUser}`);
    }
    public GetMostViewedTopics() {
        return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Search.Endpoint}${environment.EndPoints.Search.methods.GetMostViewedTopics}`);
    }
    public GetOverallTopicStats() {
        return this.svcHttp.get(`${environment.ApiEndPoint}${environment.EndPoints.Search.Endpoint}${environment.EndPoints.Search.methods.GetOverallTopicStats}`);
    }
}