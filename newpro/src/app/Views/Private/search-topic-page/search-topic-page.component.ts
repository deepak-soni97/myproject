import { Component, Input, OnInit } from '@angular/core';
import { SvcCurriculumsService, SvcGradesService, SvcMasterDataService, SvcTopicSearchService, SvcSubjectsService, SvcUsersService } from '@AppServices';
import { Options } from "@angular-slider/ngx-slider";
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SvcSchoolsService } from 'app/Services/svc-schools.service';
import { WebConfig } from "@AppConfigs/WebConfig"
import { ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-search-topic-page',
  templateUrl: './search-topic-page.component.html',
  styleUrls: ['./search-topic-page.component.scss']
})
export class SearchTopicPageComponent implements OnInit {
  @Input() topic: any;

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
    ceil: 60,
    step: 0.5,
    showTicks: true
  };
  svcTopicsService: any;
  searchResult: any;
  Curriculums: import("d:/newpro/src/app/Models/ISPListBaseModel").ISPListBaseModel[];

  constructor(private svcSearch: SvcTopicSearchService, private svcMasterDataService: SvcMasterDataService,
    private SvcCurriculumsService: SvcCurriculumsService, private SvcGradesService: SvcGradesService,
    private SvcSubjectsService: SvcSubjectsService, private SvcUsersService: SvcUsersService,
    private SvcSchoolsService: SvcSchoolsService, private fb: FormBuilder, private route: ActivatedRoute) {

    const stext: any = this.route.snapshot.queryParamMap.get('stext') || "";
    // this.getSearchResult();
    // this.getFilterMasterData();
    this.searchForm = this.fb.group({
      SearchText: [stext],
      searchGradeText: [''],
      searchCategoryText: [''],
      searchContributorText: [''],
      searchContributorSchoolText: [''],
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
      // console.log(this.searchResponse.results)
    }, 1);
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
    const formdata = new FormData();
    this.allChips = [];
    formValues.Curriculums.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
      formdata.append(`Curriculum[${idx}]`, r.id.toString())
      this.allChips.push({ type: "curriculum", id:r.id, title: r.title });

    })
    formValues.GradesGroup.map((g: any) => {
      g.gradesList.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
        formdata.append(`Grades[${idx}]`, r.id.toString())
        this.allChips.push({ type: "grade", id:r.id, title: r.gradename });
      })
    })
    formValues.SubjectsGroup.filter((r: any) => r.ischecked).map((r: any, idx: number) => {
      formdata.append(`Subject[${idx}]`, r.id.toString())
      this.allChips.push({ type: "subject", id:r.id, title: r.title });
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

    this.svcSearch.SearchTopic(formdata).subscribe((row: any) => {

      if (row.pageRows == this.pageRows || (row.pageNumber == 1 && row.pageRows < this.pageRows)) {
        let pageCountNum = parseInt((row.totalRows / row.pageRows).toString()) + (parseInt((row.totalRows % row.pageRows).toString()) > 0 ? 1 : 0)
        this.pagesCount = isNaN(pageCountNum) ? 1 : pageCountNum;

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
  GradesMasterList: any = [];
  searchGradeText: any = '';
  CurriculumGetAll() {
    this.SvcCurriculumsService.CurriculumGetAll().subscribe(data => {
      const element = this.getFormControl("Curriculums");
      const elementGrade = this.getFormControl("GradesGroup");
      data.map((row: any) => {
        const val = Object.assign({}, { ischecked: false }, row);
        element.push(this.fb.group(val));
      });

      // this.SvcGradesService.GradesGetByCurriculumId(data.map((row: any) => row.id))
      //   .subscribe((grd: any) => {

      //     this.GradesMasterList = grd.map((result: any) => {
      //       result.title = result.gradename
      //       result.groupName = data.filter((row: any) => row.id == result.curriculaid)[0].title
      //       return result;
      //     })
      //   })

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
          this.allGrades.push(gradeForm)
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

    getSearchResult = () => {
      this.svcTopicsService.GetLatestTopics().subscribe((row: any) => {
        this.searchResult = row;
      })
    }
   
    getFilterMasterData = () => {
      this.svcMasterDataService.CurriculumsGet().subscribe(row => {
        this.Curriculums = row;
      })
    }
  
  curriculumChange = (ItemList: any, item: any, event: any) => {
    if (event.target.checked) {

    } else {

    }
  }



  delete(g:any) {
   // debugger;
    let arr = 0;
    this.allChips.forEach((el: any, i: number) => {
      if (el === g) {
        arr = i;
      }
    })
     this.allChips.splice(arr, 1)
    //  this.searchResponse.results.item
     console.log(this.topic)
  }

  getFormControl(name: string): any {
    const forms = this.searchForm.get(name);
    return forms;
  }
}




