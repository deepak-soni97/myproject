// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AuthTokenKeyLSKey: "AuthToken",
  // ApiEndPoint: "http://localhost:16064/api/",
  ApiEndPoint: "http://edu-test.ostrybuddy.com/api/",
  EncyptionKey: "GemsEdu@!2021",
  EndPoints: {
    Login: "authentication/signin",
    RefreshToken: "authentication/RefreshToken",
    RegistrationStudent: "authentication/signupstudent",
    RegisterTeacher: "authentication/SignupTeacher",
    ResetPassword: "authentication/ResetPassword",
    ForgotPassword: "authentication/ForgotPassword",

    Curriculum: {
      Endpoint: "Curriculums/",
      methods: {
        CurriculumGetBySchool: "CurriculumGetBySchool",
        CurriculumGetAll: "CurriculumGetAll",
        CurriculumGetAllAdmin:"CurriculumGetAllAdmin",
        CurriculaAddNew:"CurriculaAddNew",
        CurriculaEdit:"CurriculaEdit",
        CurriculaEnable:"CurriculaEnable",
        CurriculaDisable:"CurriculaDisable"
      }
    },
    Grades: {
      Endpoint: "grades/",
      methods: {
        GradesGetByCurriculumId: "GradesGetByCurriculumId",
        GradesGetAll: "GradesGetAll",
        GradesGetByCurriculumIdAdmin:"GradesGetByCurriculumIdAdmin",
        GradesAddNew:"GradesAddNew",
        GradesEdit:"GradesEdit",
        GradesEnable:"GradesEnable",
        GradesDisable:"GradesDisable",
        GradesGetMaster:"GradesGetMaster"        
      }
    },
    Subjects: {
      Endpoint: "subjects/",
      methods: {
        SubjectsGetAll: "SubjectsGetAll",
        SubjectGetByGrades: "SubjectGetByGrades"
      }
    },
    Courses: {
      Endpoint: "Courses/",
      methods: {
        CoursesGetByGradesSubjectId: "CoursesGetByGradesSubjectId",
        CoursesGetByGradeId: "CoursesGetByGradeId",
        CoursesGetByGradeAndSubjectIdAdmin:"CoursesGetByGradeAndSubjectIdAdmin",
        CoursesAddNew:"CoursesAddNew",
        CoursesUpdate:"CoursesEdit",
        CourseEnable:"CoursesEnable",
        CourseDisable:"CoursesDisable"
      }
    },
    Topics: {
      Endpoint: "Topics/",
      methods: {
        TopicCreate: "TopicCreate",
        TopicGetById: "TopicGetById/",
        TopicGetByUserId: "TopicGetByUserId",
        TopicGetStats: "TopicGetStats",
        TopicViewed: "TopicViewed",
        TopicRate: "TopicRate",
        TopicRateGetForUser: "TopicRateGetForUserByTopicId",
        TopicLike: "TopicLike",
        TopicDislike: "TopicDislike",
        TopicLikeCheckForUser: "TopicLikeCheckForUser",
        TopicSave: "TopicSave",
        TopicUnSave: "TopicUnSave",
        TopicGetSavedTopicsForUser: "TopicGetSavedTopicsForUser",
        TopicSaveCheckForUser: "TopicSaveCheckForUser",
        TopicUpdate: "TopicUpdate",
        TopicGetParentComments: "TopicGetParentComments",
        TopicGetChildComments: "TopicGetChildComments",
        TopicCommentSubmit: "TopicComment",
        TopicAttachmentCreate: "TopicAttachmentCreate",
        TopicAttachmentsGetByTopic: "TopicAttachmentsGetByTopic",
        SubmitTopicTask: "SubmitTopicTask",
        TopicGetAllTopicsByUserId: "TopicGetAllTopicsByUserId",
        TopicsStatsGetByUserId: "TopicsStatsGetByUserId",
        TopicsToggleActiveStatus:"TopicsToggleActiveStatus",
        TopicGetByParentId:"TopicGetByParentId/"
      }
    },
    Schools: {
      Endpoint: "schools/",
      methods: {
        SchoolsGetAll: "SchoolsGetAll",
        SchoolAddNew:"SchoolAddNew",
        SchoolUpdate:"SchoolEdit"
      }
    },
    Users: {
      Endpoint: "users/",
      methods: {
        TeachersGetAll: "TeachersGetAll",
        UserProfileGet: "UserProfileGet",
        UpdateTeacherProfile: "UpdateTeacherProfile",
        TeacherProfileGet: "TeacherProfileGet",
        LogoutUser: "Logout",
        ChangePassword: "ChangePassword",
        UpdateStudentProfile: "UpdateStudentProfile",
        SearchUser:"SearchUser",
        GetApproversByStateID:"GetApproversByStateID",
        DeleteApproverByID:"DeleteApproverByID"
      }
    },

    courseId: {
      Endpoint: "Courses/",
      methods: {
        CourseLearningOutcomeGetByCourseId: "CourseLearningOutcomeGetByCourseId",
      }
    },
    WFManager: {
      Endpoint: "WFManager/",
      methods: {
        GetWFTaskPendingByWFInstanceID: "GetWFTaskPendingByWFInstanceID",
        GetMyPendingTasks: 'GetMyPendingTasks',
        GetWFTaskByID: 'GetWFTaskByID',
        CheckOutTask: 'CheckOutTask',
        GetAllMyTasks: 'GetAllMyTasks',
        DiscardCheckOutTask: 'DiscardCheckOutTask',
        InitiateNewWFInstance: 'InitiateNewWFInstance',
        GetActionsforWFState: 'GetActionsforWFState',
        SubmitWFTask: 'SubmitWFTask',
        GetCompletedWFTaskByWFInstanceID: "GetCompletedWFTaskByWFInstanceID"
      },
    },
    masterData: {
      Endpoint: "MasterData/",
      methods: {
        MasterTagSearch: "MasterTagSearch",
        MasterTagGetLatest: "MasterTagGetLatest"
      }
    },
    Search: {
      Endpoint: "Search/",
      methods: {
        SearchTopics: "SearchTopics",
      }
    },
    DocumentsManagement: {
      Endpoint: "DocumentsManagement/",
      methods: {
        DownloadFileAsync: "DownloadFileAsync",
        DeleteFileAsync: "DeleteFileAsync",
        GetFileUrl: "GetFileUrl"
      }
    },
    LearningOutcomes: {
      Endpoint: "LearningOutcomes/",
      methods: {
        GetLearningOutcomesByCourseId: "GetLearningOutcomesByCourseId",
        GetLearningOutcomesByCourseIdAdmin: "GetLearningOutcomesByCourseIdAdmin",
        EditLearningOutcomes: "EditLearningOutcomes",
        AddLearningOutcomes: "AddLearningOutcomes",
        ToggleLearningOutcomesEnable: "ToggleLearningOutcomesEnable",
        DeleteLearningOutcome: "DeleteLearningOutcome"
      }
    }
  }

}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
