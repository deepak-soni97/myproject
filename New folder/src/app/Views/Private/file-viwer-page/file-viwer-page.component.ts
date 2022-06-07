import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SvcMasterDataService } from "@AppServices"
@Component({
  selector: 'app-file-viwer-page',
  templateUrl: './file-viwer-page.component.html',
  styleUrls: ['./file-viwer-page.component.scss']
})
export class FileViwerPageComponent implements OnInit {
  loadViewer: boolean = false;
  fileViewerUrl: string = '';
  fileViewerType: string = 'url';
  @Input() fileName: string = "";
  
  constructor(private route: ActivatedRoute,
    private router: Router, private svcMaster: SvcMasterDataService) {
    this.route.params.subscribe(routeParams => {

      const file: any = this.route.snapshot.queryParamMap.get('file');
      const id: any = this.route.snapshot.queryParamMap.get('id');
      this.getFilePreviewUrl(file);

    })
  }

  ngOnInit(): void {
  }

  getFilePreviewUrl(fileName: string) {
    this.fileName = fileName;
    this.svcMaster.FilePreviewUrlGet(fileName).subscribe(x => {
      this.fileViewerUrl = x;
      this.loadViewer = true;
    })
  }

}
