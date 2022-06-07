import { Component, OnInit } from '@angular/core';
import { SvcCurriculumsService } from '../../../Services/svc-curriculums.service'
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { map } from 'rxjs/operators';
import { TreeNode } from 'primeng/api/treenode';
import { SvcCoursesService } from '../../../Services/svc-courses.service';
import { SvcGradesService } from '../../../Services/svc-grade.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  currTitle: any = [];
  gradeName: any = [];
  courseName: any = [];

  constructor(private service: SvcCurriculumsService,private route: ActivatedRoute,
    private router: Router, private courseService: SvcCoursesService,
    private gradeService: SvcGradesService) {
   }

  ngOnInit() {
    this.getGrades();
  }

  getGrades = async () => {
      await this.service.CurriculumGetBySchool().subscribe(data =>{
        this.currTitle = data;
        console.log(this.currTitle)
      })
  }

  viewDetails(id:any){
    this.gradeName = [];
    this.gradeService.GradesGetByCurriculumId(id).subscribe(data =>{
     this.gradeName = data;
     console.log(this.gradeName)
   });
  }

  coursesDetails(id:any){
    console.log(id);
    this.courseName = [];
    this.courseService.CoursesGetByGradeId(id).subscribe(data =>{
      this.courseName = data;
      console.log(this.courseName)
    })
  }
}
