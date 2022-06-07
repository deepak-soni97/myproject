import { Component, OnInit } from '@angular/core';
import { WebConfig } from '@AppConfigs/WebConfig';
import { SvcTopicSearchService } from '@AppServices';
import { SvcTopicsService } from 'app/Services/svc-topics.service';

@Component({
  selector: 'app-saved-topics-page',
  templateUrl: './saved-topics-page.component.html',
  styleUrls: ['./saved-topics-page.component.scss']
})
export class SavedTopicsPageComponent implements OnInit {

  popularTopics: any = [];
  constructor(private svcSearch: SvcTopicSearchService) { }

  ngOnInit(): void {
    this.getSavedTopics();
  }

  searchResponse: any;
  activePage: number = 1;
  pagesCount: number = 0;
  getSavedTopics = () => {
    this.activePage = 1;
    this.searchTopic();
  }
  searchTopic() {
    const formdata = new FormData();
    formdata.append("PageRowsLimit", "12")
    formdata.append("OrderByField", WebConfig.sortOrderList[0].Value)
    formdata.append("OrderDirection", "Ascending")
    formdata.append("PageNumber", this.activePage.toString());
    formdata.append("SearchInSaved", true.toString());
    this.svcSearch.SearchTopic(formdata).subscribe((row: any) => {
      if (row.pageRows == 12 || (row.pageNumber == 1 && row.pageRows < 12)) {
        let pageCountNum = parseInt((row.totalRows / row.pageRows).toString()) + (parseInt((row.totalRows % row.pageRows).toString()) > 0 ? 1 : 0)
        this.pagesCount = isNaN(pageCountNum) ? 1 : pageCountNum;
        console.log(this.pagesCount)
      } else if (row.totalRows == 0) {
        this.pagesCount = 1;
      }
      this.searchResponse = row;
    });

  }
  pageNumClick(index: number) {
    this.activePage = index + 1;
    this.searchTopic();
  }
  onNextPrevClick(isNext: boolean) {
    if (isNext) {
      this.activePage = this.activePage + 1;
    }
    else
      this.activePage = this.activePage - 1;
    this.searchTopic();
  }
  changes(m: any, i: any) {
    // m['contributorFullName'] = m['createdbyuser'];
    m['contributorFullName'] = 'createdbyuser';
    m['curriculum'] = m['curriculums'];
  }

}
