import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmService, SvcCoursesService, SvcCurriculumsService, SvcGradesService, SvcLocalStorageService, SvcMasterDataService, SvcSubjectsService, SvcTopicsService, SvcWFManagerService } from '@AppServices';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-topic-contribution-page',
  templateUrl: './topic-contribution-page.component.html',
  styleUrls: ['./topic-contribution-page.component.scss']
})
export class TopicContributionPageComponent implements OnInit {

  contribForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required,]],
    // programSelectList: ['', [Validators.required]],
    // GradeSelectList: ['', [Validators.required]],
    // CourseSelectList: ['', [Validators.required]],
    // SubjectSelectList: ['', [Validators.required]],
    // hourList: ['', [Validators.required]],
    // minuteList: ['', [Validators.required]],
    // TopicLevel: ['', [Validators.required]],
    // learningOutcomes: new FormArray([this.fb.group({
    //   Id: new FormControl(0, []),
    //   Outcome: new FormControl('', []),
    // })]),

    // ExternalContents: new FormArray([]),
    // BannerFile: ['', [Validators.required]],
    // TopicTags: [[]],
    // bulkeditsLearningOutcome: [''],
    // Attachments: new FormArray([]),
    // // s_Url: ['', [Validators.required, Validators.pattern(reg)]]

    // //  learningOutcomeItemsBulk: ['', [Validators.required]]
  });

  getFormControl(ctrlName: string) {
    return this.contribForm.get(ctrlName);
  }
  constructor(private http: HttpClient,
    private svcMasterDataService: SvcMasterDataService,
    private svcCurriculumn: SvcCurriculumsService,
    private fb: FormBuilder,
    private modalService: MdbModalService,
    private svcGrade: SvcGradesService,
    private svcSubjects: SvcSubjectsService,
    private DialogConfirmService: DialogConfirmService,
    private _service: SvcTopicsService,
    private svcCourses: SvcCoursesService,
    private ngModalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private svcLocalStorage: SvcLocalStorageService,
    private svcWfManager: SvcWFManagerService) {


  }

  ngOnInit(): void {



  }

}
