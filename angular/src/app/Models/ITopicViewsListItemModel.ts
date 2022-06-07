import { ISPListBaseModel } from "./ISPListBaseModel";

export interface ITopicViewsListItemModel extends ISPListBaseModel {
    AverageRating: number;
    Id: number;
    TotalComments: number;
    TotalLikes: number;
    TotalRatings: number;
    TotalSaves: number;
    TotalShares: number;
    TotalViews: number;
}