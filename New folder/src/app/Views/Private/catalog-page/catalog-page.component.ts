import { Component, OnInit } from '@angular/core';
import { SvcCurriculumsService } from '../../../Services/svc-curriculums.service'
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { map } from 'rxjs/operators';
import { TreeNode } from 'primeng/api/treenode';
import { SvcCoursesService } from '../../../Services/svc-courses.service';
import { SvcGradesService } from '../../../Services/svc-grade.service';
import { SvcTopicSearchService } from '@AppServices';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  currData: any = [];
  gradeName: any = [];
  courseName: any = [];
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    center: false,
    autoWidth: false,
    stagePadding: 10,


    // margin:10,
    //navText: ['', ''],
    // responsive: {
    //   0: {
    //     items: 1,
    //     slideBy: 1,
    //   },
    //   768: {
    //     items: 2,
    //     slideBy: 2,
    //   },
    //   1024: {
    //     items: 3,
    //     slideBy: 3,
    //   },
    //   1366: {
    //     items: 4,
    //     slideBy: 4,
    //   },
    //   1600: {
    //     items: 4,
    //     slideBy: 4,
    //   },
    //   1920: {
    //     items: 4,
    //     slideBy: 4,
    //   },
    // },
    nav: true
  }
  constructor(private service: SvcCurriculumsService, private route: ActivatedRoute,
    private router: Router, private courseService: SvcCoursesService,
    private gradeService: SvcGradesService, private svcSearch: SvcTopicSearchService) {
  }

  ngOnInit() {
    this.getCurriculumn();
  }

  getCurriculumn = async () => {
    await this.service.CurriculumGetBySchool().subscribe(data => {
      data.map((x: any) => x.gradeList = [])
      this.currData = data;
    })
  }

  getGrades(curId: any, cidx: number) {
    if (this.currData[cidx].gradeList.length == 0) {
      this.gradeService.GradesGetByCurriculumId(curId).subscribe((data: any) => {
        data.map((x: any) => x.courseList = [])
        this.currData[cidx].gradeList = data;
      });
    }

  }

  coursesDetails(gradeId: any, cidx: number, gidx: number) {
    if (this.currData[cidx].gradeList[gidx].courseList.length == 0) {
      this.courseService.CoursesGetByGradeId(gradeId).subscribe((data: any) => {
        data.map((x: any) => x.topicList = [])
        this.currData[cidx].gradeList[gidx].courseList = data;
      })
    }

  }
  onCourseClick(curIdx: number, gradeIdx: number, courseIdx: number) {
    debugger;
    let curriculum = this.currData[curIdx];
    let grade = curriculum.gradeList[gradeIdx];
    let course = grade.courseList[courseIdx];
    if (course.topicList.length == 0) {
      const formdata = new FormData();
      formdata.append(`Curriculum[0]`, curriculum.id.toString());
      formdata.append(`Grades[0]`, grade.id.toString())
      formdata.append(`Courses[0]`, course.courseId.toString())

      formdata.append("PageRowsLimit", "20")
      formdata.append("OrderByField", "PublishedDate")
      formdata.append("OrderDirection", "Descending")
      formdata.append("PageNumber", "1");

      this.svcSearch.SearchTopic(formdata).subscribe((row: any) => {
        console.log("search Resp", row);
        this.currData[curIdx].gradeList[gradeIdx].courseList[courseIdx].topicList = row.results;
        // if (row.pageRows == this.pageRows || (row.pageNumber == 1 && row.pageRows < this.pageRows)) {
        //   let pageCountNum = parseInt((row.totalRows / row.pageRows).toString()) + (parseInt((row.totalRows % row.pageRows).toString()) > 0 ? 1 : 0)
        //   this.pagesCount = isNaN(pageCountNum) ? 1 : pageCountNum;
        //   console.log(this.pagesCount)
        // } else if (row.totalRows == 0) {
        //   this.pagesCount = 1;
        // }
        // this.searchResponse = row;
      });
    }
  }
}
