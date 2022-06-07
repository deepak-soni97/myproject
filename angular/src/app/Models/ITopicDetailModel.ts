import { IAuthorModel, IBannerImageModel, IGradeModel, ISPListBaseModel } from "@AppModels";

export interface ITopicDetailModel extends ISPListBaseModel {
    Curriculum:ISPListBaseModel[];
    Grade:IGradeModel[];
    Course:ISPListBaseModel[];
    Unit:ISPListBaseModel[];
    TopicTag:ISPListBaseModel[];
    TopicRequestStatus:ISPListBaseModel;
    CurriculumLevelApproval:ISPListBaseModel[];
    Author:IAuthorModel;
    Topic_Subjects:ISPListBaseModel[];
    Edupedia_Description:string;
    BannerImage:IBannerImageModel;
    IsActive1:boolean;
    IsVisible: boolean,
    IsDeleted: boolean,
    ReferenceID: string,
    Created: string,
    PublishedOn: string,
    IsFeatured: boolean,
    FeaturedTill?: string,
    CompletionDuration: number,
    Edupedia_AttachmentNames: string,
    Edupedia_ExternalContent: string,
    TopicLevel: string,
    Has_AudioContent: boolean,
    Has_ExcelDocument: boolean,
    Has_ExternalContent: boolean,
    Has_ImageFiles: boolean,
    Has_PDFDocument: boolean,
    Has_PPTDocument: boolean,
    Has_VideoContent: boolean,
    Has_WordDocument: boolean,
    Has_ZippedFile: boolean,
    ParentTopicId?: number,
    Edupedia_LearningOutcomes:string,
    Edupedia_LearningObjectives?: string,
    Phoenix_Course?: string,
    Phoenix_Course_Id?: string,
    Phoenix_Grade?: string,
    Phoenix_Grade_Id?:string,
    Phoenix_Program?: string,
    Phoenix_Program_Id?:string,
    Phoenix_SubTopic?: string,
    Phoenix_SubTopic_Id?:string,
    Phoenix_Topic?: string,
    Phoenix_Topic_Id?:string,
}