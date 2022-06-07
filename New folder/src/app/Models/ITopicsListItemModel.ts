import { IAuthorModel } from "./IAuthorModel";
import { IBannerImageModel } from "./IBannerImageModel";
import { IGradeModel } from "./IGradeModel";
import { ISPListBaseModel } from "./ISPListBaseModel";

export interface ITopicsListItemModel extends ISPListBaseModel {

    Id: number;
    Edupedia_Description: string;
    Author: IAuthorModel;
    BannerImage: IBannerImageModel;
    CompletionDuration: number;
    Course: ISPListBaseModel[];
    Created: string,
    Curriculum: ISPListBaseModel[];
    Edupedia_LearningOutcomes: string;
    TopicLevel: string;
    TopicRequestStatusId: number;
    TopicTag: ISPListBaseModel[];
    Topic_Subjects: ISPListBaseModel[];
    Grade: IGradeModel[];
}
