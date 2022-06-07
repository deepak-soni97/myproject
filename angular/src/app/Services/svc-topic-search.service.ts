import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITopicDetailModel, ITopicsListItemModel, ITopicViewsListItemModel } from '@AppModels';
import { Observable, Observer } from 'rxjs';
import { LatestTopics } from "@AppConfigs/ConstantDatas"
import { environment } from '@AppConfigs/environment';
import { DialogConfirmService } from '@AppServices';
import { NumberInput } from '@angular/cdk/coercion';
@Injectable({
    providedIn: 'root'
})
export class SvcTopicSearchService {

    constructor(private svcHttp: HttpClient, private svcLoader: DialogConfirmService) { }

    public SearchTopic(formdata: any) {
        this.svcLoader.isLoading.next(true);
        return this.svcHttp.post(`${environment.ApiEndPoint}${environment.EndPoints.Search.Endpoint}${environment.EndPoints.Search.methods.SearchTopics}`, formdata);
    }
    public RelatedTopicsGet(formdata: any) {
        formdata.append("PageRowsLimit", "5".toString());
        formdata.append("OrderByField", "1");
        formdata.append("OrderDirection", "Descending");
        formdata.append("PageNumber", "1");

        return this.SearchTopic(formdata)
    }
    public GetTeacherTopics(teacherId: number, numberofRecord: number) {
        var formdata = new FormData();
        formdata.append(`Contributors[0]`, teacherId.toString());
        formdata.append("PageRowsLimit", numberofRecord.toString());
        formdata.append("OrderByField", "1");
        formdata.append("OrderDirection", "Descending");
        formdata.append("PageNumber", "1");

        return this.SearchTopic(formdata)
    }
    public RecommandedTopicsGet(formdata: any) {
        formdata.append("PageRowsLimit", "5".toString());
        formdata.append("OrderByField", "1");
        formdata.append("OrderDirection", "Descending");
        formdata.append("PageNumber", "1");

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


}