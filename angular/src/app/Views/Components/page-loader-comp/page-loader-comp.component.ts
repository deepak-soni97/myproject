import { Component, OnInit } from '@angular/core';
import { DialogConfirmService } from "@AppServices"
@Component({
  selector: 'app-page-loader-comp',
  templateUrl: './page-loader-comp.component.html',
  styleUrls: ['./page-loader-comp.component.scss']
})
export class PageLoaderCompComponent implements OnInit {
  loading: boolean;
  constructor(private svcDialog: DialogConfirmService) {
    this.svcDialog.isLoading.subscribe((isEnable: boolean) => {
     
      this.loading = isEnable
    })
  }

  ngOnInit(): void {

  }

}
