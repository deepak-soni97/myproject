import { Component, Input, OnInit } from '@angular/core';
import { ISPListBaseModel, ITopicsListItemModel } from '@AppModels';
import { SvcCurriculumsService, SvcGradesService, SvcMasterDataService, SvcTopicSearchService, SvcSubjectsService, SvcTopicsService, SvcUsersService } from '@AppServices';
import { Options } from "@angular-slider/ngx-slider";
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SvcSchoolsService } from 'app/Services/svc-schools.service';
import { WebConfig } from "@AppConfigs/WebConfig"
import { ActivatedRoute, Router } from '@angular/router';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
@Component({
  selector: 'app-search-topic-page',
  templateUrl: './search-topic-page.component.html',
  styleUrls: ['./search-topic-page.component.scss']
})
export class SearchTopicPageComponent implements OnInit {

  @Input() isSavedOnly: boolean = false;
  searchForm: FormGroup;
  sortingTypes: any = WebConfig.sortOrderList;
  minRating: number = 0;
  maxRating: number = 5;
  optionsRating: Options = {
    floor: 0,
    ceil: 5,
    step: 0.5,
    showTicks: true
  };
  pageRows = 12;
  minDuration: number = 0;
  maxDuration: number = 100;
  optionsDuration: Options = {
    floor: 0,
    ceil: 100,
    step: 0.5,
    showTicks: true
  };

  constructor(private svcSearch: SvcTopicSearchService, private svcMasterDataService: SvcMasterDataService,
    private SvcCurriculumsService: SvcCurriculumsService, private SvcGradesService: SvcGradesService,
    private SvcSubjectsService: SvcSubjectsService, private SvcUsersService: SvcUsersService,
    private SvcSchoolsService: SvcSchoolsService, private fb: FormBuilder, private route: ActivatedRoute) {

    const stext: any = this.route.snapshot.queryParamMap.get('stext') || "";
    // this.getSearchResult();
    // this.getFilterMasterData();
    this.searchForm = this.fb.group({
      SearchText: [stext],
      LevelGroup: new FormArray([
        this.fb.group({ level: new FormControl('Beginner', []), ischecked: new FormControl(false, []) }),
        this.fb.group({ level: new FormControl('Intermediate', []), ischecked: new FormControl(false, []) }),
        this.fb.group({ level: new FormControl('Expert', []), ischecked: new FormControl(false, []) })

      ]),
      Curriculums: new FormArray([]),
      GradesGroup: new FormArray([]),
      SubjectsGroup: new FormArray([]),
      ContributorGroup: new FormArray([]),
      ContributorSchoolGroup: new FormArray([]),
      OrderByField: ['PublishedDate']
    });

    this.CurriculumGetAll();
    // this.GradesGetAll();
    this.SubjectsGetAll();
    this.Contributor();
    this.ContributorSchool();


    this.searchTopic();
  }

  searchResponse: any;
  refetchSearch(strType: string, selectedObj: any) {
   
    setTimeout(() => {
      this.activePage = 1;
      this.searchTopic();
    }, 1);
    //console.log(strType, selectedObj)
    // if (strType == "Curriculums") {

    // const elementGrade = this.getFormControl("GradesGroup");
    // const value = elementGrade.value;
    // if (selectedObj.ischecked) {
    //   //need to remove
    //   elementGrade.clear();
    //   value.filter((r: any) => r.curriculumId != selectedObj.curriculumId).map((r: any) => {

    //   })
    // } else {
    //   this.SvcGradesService.GradesGetByCurriculumId(selectedObj.id).subscribe((data: any) => {
    //     const gradeForm = this.fb.group({
    //       curriculumTitle: selectedObj.title,
    //       curriculumId: selectedObj.curriculummasterid,
    //       gradesList: new FormArray(data.map((row: any) => {
    //         const val = Object.assign({}, { ischecked: false }, row);
    //         return this.fb.group(val);
    //       }))
    //     })
    //     elementGrade.push(gradeForm);
    //   })
    //}

    //}

  }
  searchTopic() {
    const formValues = this.searchForm.value;
    console.log(formValues, this.minRating, this.maxRating);
    const formdata = new FormData();
    formValues.Curriculums.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
      formdata.append(`Curriculum[${idx}]`, r.id.toString())
    })
    formValues.GradesGroup.map((g: any) => {
      g.gradesList.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
        formdata.append(`Grades[${idx}]`, r.id.toString())
      })
    })
    formValues.SubjectsGroup.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
      formdata.append(`Subject[${idx}]`, r.id.toString())
    })
    // formValues.SubjectsGroup.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
    //   formdata.append(`Courses[${idx}]`, r.id.toString())
    // })
    formValues.LevelGroup.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
      formdata.append(`TopicLevel[${idx}]`, r.level.toString())
    })
    formValues.ContributorGroup.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
      formdata.append(`Contributors[${idx}]`, r.userId.toString())
    })
    formValues.ContributorSchoolGroup.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
      formdata.append(`ContributorSchools[${idx}]`, r.id.toString())
    })
    formdata.append(`FromAverageRating`, this.minRating.toString());
    formdata.append(`ToAverageRating`, this.maxRating.toString());

    formdata.append(`FromDuration`, this.minDuration.toString());
    formdata.append(`ToDuration`, this.maxDuration.toString());

    formdata.append("SearchText", formValues.SearchText);
    formdata.append("PageRowsLimit", this.pageRows.toString())
    formdata.append("OrderByField", formValues.OrderByField)
    formdata.append("OrderDirection", "Descending")
    formdata.append("PageNumber", this.activePage.toString());

    if (this.isSavedOnly) {
      formdata.append("SearchInSaved", true.toString());
    }
    console.log(formdata)
    this.svcSearch.SearchTopic(formdata).subscribe((row: any) => {
      console.log("search Resp", row);
      if (row.pageRows == this.pageRows || (row.pageNumber == 1 && row.pageRows < this.pageRows)) {
        let pageCountNum = parseInt((row.totalRows / row.pageRows).toString()) + (parseInt((row.totalRows % row.pageRows).toString()) > 0 ? 1 : 0)
        this.pagesCount = isNaN(pageCountNum) ? 1 : pageCountNum;
        console.log(this.pagesCount)
      } else if (row.totalRows == 0) {
        this.pagesCount = 1;
      }
      this.searchResponse = row;
    });

  }
  IsExpand: boolean = true;
  pagesCount: number = 1;
  activePage: number = 1;
  // Curriculums: ISPListBaseModel[] = [];
  // CurriculumSelected: ISPListBaseModel[] = [];
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
  allGrades: any = [];
  allSubjects: any = [];
  contributor: any = [];
  allSchools: any = [];
  allChips: any = [];


  ngOnInit(): void {

  }
  ngOnChanges(changes: any) {
    if (changes.isSavedOnly) {
      this.searchTopic();
    }
  }

  toggleFilter = () => {
    this.IsExpand = !this.IsExpand;
  }

  CurriculumGetAll() {
    this.SvcCurriculumsService.CurriculumGetAll().subscribe(data => {
      const element = this.getFormControl("Curriculums");
      const elementGrade = this.getFormControl("GradesGroup");
      data.map((row: any) => {
        const val = Object.assign({}, { ischecked: false }, row);
        element.push(this.fb.group(val));
      });

      data.forEach((d: any) => {
        this.SvcGradesService.GradesGetByCurriculumId(d.id).subscribe((data: any) => {
          const gradeForm = this.fb.group({
            curriculumTitle: d.title,
            curriculumId: d.curriculummasterid,
            gradesList: new FormArray(data.map((row: any) => {
              const val = Object.assign({}, { ischecked: false }, row);
              return this.fb.group(val);
            }))
          })
          elementGrade.push(gradeForm);
        })
      })

    })
  }

  SubjectsGetAll() {
    this.SvcSubjectsService.SubjectsGetAll().subscribe((data: any) => {
      const element = this.getFormControl("SubjectsGroup");
      data.map((row: any) => {
        const val = Object.assign({}, { ischecked: false }, row);
        element.push(this.fb.group(val));
      });
    })
  }

  Contributor() {
    this.SvcUsersService.TeachersGetAll().subscribe((data: any) => {
      const element = this.getFormControl("ContributorGroup");
      data.map((row: any) => {
        const val = Object.assign({}, { ischecked: false }, row);
        element.push(this.fb.group(val));
      });

    })
  }

  ContributorSchool() {
    this.SvcSchoolsService.SchoolsGetAll().subscribe((data: any) => {
      const element = this.getFormControl("ContributorSchoolGroup");
      data.map((row: any) => {
        const val = Object.assign({}, { ischecked: false }, row);
        element.push(this.fb.group(val));
      });
    })
  }
  /*
    getSearchResult = () => {
      this.svcTopicsService.GetLatestTopics().subscribe(row => {
        this.seachResult = row;
      })
    }
   
    getFilterMasterData = () => {
      this.svcMasterDataService.CurriculumsGet().subscribe(row => {
        this.Curriculums = row;
        console.log(this.Curriculums)
      })
    }
  */
  curriculumChange = (ItemList: any, item: any, event: any) => {
    console.log();
    if (event.target.checked) {

    } else {

    }
  }

  selected(item: any, event: any) {
    let count = 0;
    if (event.target.checked) {
      console.log(item)
      if (item.title != undefined) {
        this.allChips.forEach((el: any) => {
          if (el === item.title) {
            count = count + 1;
          }
        })
        console.log(count);
        if (count === 0) {
          this.allChips.push(item.title);
        }
      } else if (item.name != undefined) {
        this.allChips.push(item.name);
      }
    }
    console.log(this.allChips)
  }

  selected1(item: any, event: any, title: any) {
    let count = 0;
    if (event.target.checked) {
      this.allChips.forEach((el: any) => {
        if (el === title) {
          count = count + 1;
        }
      })
      console.log(count);
      if (count === 0) {
        this.allChips.push(title);
      }
      this.allChips.push(item.gradename);
      console.log(this.allChips)
    }
  }

  delete(g: any) {
    console.log(g)
    let arr = 0;
    this.allChips.forEach((el: any, i: number) => {
      if (el === g) {
        arr = i;
      }
    })
    console.log(arr)
    this.allChips.splice(arr, 1)
  }
  getFormControl(name: string): any {

    const forms = this.searchForm.get(name);
    return forms;
  }
}




