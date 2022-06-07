import { WebConfig as app } from "@AppConfigs/WebConfig"
export function getFileTypeFn(fileextension: string): string {
    if (app.allowedImageExtensions.indexOf(fileextension.toLowerCase()) >= 0) {
        return "image";
    }
    else if (["doc", "docx", "odt"].indexOf(fileextension.toLowerCase()) >= 0) {
        return "word";
    }
    else if (["pdf"].indexOf(fileextension.toLowerCase()) >= 0) {
        return "pdf";
    }
    else if (["xls", "xlsx", "csv"].indexOf(fileextension.toLowerCase()) >= 0) {
        return "excel";
    }
    else if (["txt"].indexOf(fileextension.toLowerCase()) >= 0) {
        return "text";
    }
    else if (["ppt", "pptx"].indexOf(fileextension.toLowerCase()) >= 0) {
        return "powerpoint";
    }
    else if (['webm', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'mp4', 'm4p', 'm4v', 'avi', 'wmv', 'mov', 'qt', 'flv', 'swf', 'avchd'].indexOf(fileextension.toLowerCase()) >= 0) {
        return "video";
    }
    else if (['m4a', 'flac', 'mp3', 'wav', 'wma', 'acc'].indexOf(fileextension.toLowerCase()) >= 0) {
        return "audio";
    }
    else if (["zip", "rar"].indexOf(fileextension.toLowerCase()) >= 0) {
        return "zip";
    }
    else {
        return "others";
    }
}

export function getFileviewUrlFn(file: any) {
    let ServerRelativeUrl = file.ServerRelativeUrl;
    let extension = ServerRelativeUrl.split('.').pop();
    //ServerRelativeUrl[ServerRelativeUrl.lastIndexOf(".")];
    let FileType = getFileTypeFn(extension);
    let FileViewerUrl = `https://gemsedu.sharepoint.com/sites/Edupedia-QA/_layouts/15/embed.aspx?UniqueId=${file.UniqueId}&client_id=FileViewerWebPart&embed={"af":false,"id":"${file.UniqueId}","o":"https://gemsedu.sharepoint.com","p":1,"z":"width"}`;
    if (["word", "excel", "powerpoint"].indexOf(FileType) > -1) {
        FileViewerUrl = `https://gemsedu.sharepoint.com/:x:/r/sites/Edupedia-QA/_layouts/15/Doc.aspx?sourcedoc=${ServerRelativeUrl}&action=embedview`;
    }

    return FileViewerUrl;
}