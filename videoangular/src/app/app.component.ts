import { Component } from "@angular/core";
import { IVideoConfig } from "ngx-video-list-player";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    config: IVideoConfig = {
        isVideoLoader: true,
        isAutoPlay: false,
        isFirstVideoAutoPlay: false,
        volumeCookieName: "NgxVideoListPlayerVolume",
        videoIndexCookieName: "NgxVideoListPlayerIndex",
        sources: [{
            src: "https://qa-edupedia.s3.eu-west-1.amazonaws.com/TopicFiles/637786387371966177_Comment%20post%20issue.webm?X-Amz-Expires=14400&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQCQWSZETG524KYXR/20220211/eu-west-1/s3/aws4_request&X-Amz-Date=20220211T071309Z&X-Amz-SignedHeaders=host&X-Amz-Signature=074421bc77c67b7431f98896c21bc84179f611edaf60f308e6946386bc2e6015",
            },
            {
              src: "https://edupedia-dev.s3.eu-west-1.amazonaws.com/TopicFiles/637758749209189415_Sample%20MPG%20Video%20File%20for%20Testing.mpg?X-Amz-Expires=14400&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUFHTES7BUZHSF4WV/20220211/eu-west-1/s3/aws4_request&X-Amz-Date=20220211T052738Z&X-Amz-SignedHeaders=host&X-Amz-Signature=3ced0366a50770ec09c882148adbd1430b9646c72fedc40de6ca2848c758d9ca"
            },
            {
              src:"https://edupedia-dev.s3.eu-west-1.amazonaws.com/TopicFiles/637758749368620907_Sample-AVI-Video-File-for-Testing.avi?X-Amz-Expires=14400&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUFHTES7BUZHSF4WV/20220211/eu-west-1/s3/aws4_request&X-Amz-Date=20220211T052724Z&X-Amz-SignedHeaders=host&X-Amz-Signature=3657cceab35de51cffa2fc14ef844edf85184db1cdd954016a32c7e53bd767e7",
            }
          ]          
    };
       constructor() {       

    }
}
