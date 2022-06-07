import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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

      this.fileName = this.route.snapshot.queryParamMap.get('file') || '';
      const id: any = this.route.snapshot.queryParamMap.get('id');

      this.getFilePreviewUrl();

    })
  }

  ngOnInit(): void {

  }

  getFilePreviewUrl() {

    if (this.fileName)
      this.svcMaster.FilePreviewUrlGet(this.fileName).subscribe(x => {
        this.fileViewerUrl = x;
        this.loadViewer = true;
      })
  }
  ngOnChanges(changes: SimpleChanges) {
    this.fileName = changes['fileName'].currentValue;
    this.getFilePreviewUrl();
  }
}
