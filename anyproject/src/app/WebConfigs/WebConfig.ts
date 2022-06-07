export const WebConfig = {
    SiteUrl: "https://gemsedu.sharepoint.com/sites/Edupedia/",
    SitePagesSuffix: "Pages/",
    IconsPath: "Style%20Library/Assets/Edupedia.SP/img/icons",
    PagesName: {
        TopicDetail: "topic-details",
        TopicDetailById: "topic-details/:topicid",
        SearchPage: "search-results",
        Cataloge: "topics-matrix",
        TeacherProfile: "teacher-profile",
        TeacherProfileEdit: "teacher-profile-edit",
        SavedTopic: "my-favorites",
        ContributeTopic: "contribute-topic",
        TeacherDashboard: "my-dashboard",
        SchoolDashboard: "school-dashboard-page",
        TopicApproval: "topic-approval",
        LoginPage: "authentication",
        FileViewerPage: "preview",
        changePassword: "change-password",
        AdministratorHome: "administrator-home",
        learningOutcomes: "master-learning-outcomes",
        schoolManagement: "schools",
        curriculumManagement: "curriculum",
        gradeManagement: "grades",
        courseManagement: "courses",
        userManagement: "users",
        approverManagement: "approvers",
        ForgotPassword: "auth-forget",
        ResetPassword: "resetpassword",
        StudentProfile: "student-profile",
        StudentProfileEdit: "student-profile-edit",
        schoolApproverManagement: "school-approvers",
        curricluaApproverManagement: "currilula-approvers",
        subjectManagement: "subjects",

    },
    topicStatusKey: {
        Draft: "Draft",
        Published: "Published",
        Completed: "Completed",
        Rejected: "Rejected",
        BackToInitiator: "Back to Initiator for update",
        Submitted: "Submitted",
        Deactivated: "Deactivated"
    },
    isTeacher: true,
    allowedExtensions: [
        'doc', 'docx', 'odt', 'pdf', 'xls', 'xlsx', 'ods', 'ppt', 'pptx', 'txt', 'htm', 'html', 'zip',
        'jpeg', 'jpg', 'png', 'gif', 'tiff', 'eps', 'psd', 'indd', 'ai', 'raw',
        'webm', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'mp4', 'm4p', 'm4v', 'avi', 'wmv', 'mov', 'qt', 'flv', 'swf', 'avchd',
        'm4a', 'flac', 'mp3', 'wav', 'wma', 'acc'
    ],
    msFileExtensions: [
        'doc', 'docx', 'odt', 'xls', 'xlsx', 'ods', 'ppt', 'pptx'
    ],
    allowedImageExtensions: ['jpeg', 'jpg', 'png', 'gif', 'tiff', 'eps', 'psd', 'indd', 'ai', 'raw'],
    sortOrderList: [{
        Title: "Published Date",
        Value: "PublishedDate"
    }, {
        Title: "Alphabetical",
        Value: "Alphabetical"
    }, {
        Title: "Most Viewed",
        Value: "View"
    }, {
        Title: "Most Liked",
        Value: "Like"
    }, {
        Title: "Most Comment",
        Value: "Comment"
    }, {
        Title: "Most Saved",
        Value: "Saved"
    }, {
        Title: "Top Rated",
        Value: "Rating"
    }, {
        Title: "Top Rating Count",
        Value: "NoofRatings"
    }],
    contentTypeIcon: (type: string, fileExtension: string = '') => {
        let css: string = 'flaticon-unknown-file';

        if (type || fileExtension) {
            if (type.indexOf('image') > -1) {
                css = 'flaticon-jpg'

            } else if ([".xls", ".xlsx", "xls", "xlsx"].indexOf(fileExtension.toLowerCase()) > -1) {
                css = 'flaticon-xls'
            } else if (type == "application/pdf") {
                css = 'flaticon-pdf'
            } else if ([".docx", ".doc", "docx", "doc"].indexOf(fileExtension.toLowerCase()) > -1) {
                css = "flaticon-doc";
            } else if ([".pptx", ".ppt", "pptx", "ppt"].indexOf(fileExtension.toLowerCase()) > -1)
                css = "flaticon-ppt"
            else if (type == "text/plain")
                css = "flaticon-txt";
            else if ([".zip", ".rar", "zip", "rar"].indexOf(fileExtension.toLowerCase()) > -1)
                css = "flaticon-zip"
            else if (["mp3",".mp3",'wav','.wav', 'wma','.wma', 'acc','.acc'].indexOf(fileExtension.toLowerCase()) > -1)
                css = "flaticon-audio-waves"
            else if ([ 'webm', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'mp4', 'm4p', 'm4v', 'avi', 'wmv', 'mov', 'qt', 'flv', 'swf', 'avchd', '.webm', '.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.ogg', '.mp4', '.m4p', '.m4v', '.avi', '.wmv', '.mov', '.qt', '.flv', '.swf', '.avchd'].indexOf(fileExtension.toLowerCase()) > -1)
                css = "flaticon-video"

        }
        return css;
    }
}