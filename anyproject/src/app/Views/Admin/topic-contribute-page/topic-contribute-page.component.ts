import { HttpClient, HttpEvent, HttpEventType, JsonpClientBackend } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
//import program from './_files/ProgramDetail.json';
import { ContributeTopicModalComponent } from '@AppComponents/contribute-topic-modal/contribute-topic-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MatChipsModule } from '@angular/material/chips';
import program from '../../../WebConfigs/_files/programdetail.json'
import { DialogConfirmService } from 'app/Services/dialog-confirm.service';
import { SvcCurriculumsService, SvcCoursesService, SvcMasterDataService, SvcGradesService, SvcSubjectsService, SvcTopicsService, SvcLocalStorageService, SvcWFManagerService } from '@AppServices';
// import { ContributeModalExternalComponent } from '';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@AppConfigs/environment';
import { ContributeSavedDraftComponent } from '@AppComponents/contribute-saved-draft/contribute-saved-draft.component';
import Swal from 'sweetalert2';
import { WebConfig } from '@AppConfigs/WebConfig';
@Component({
  selector: 'app-topic-contribute-page',
  templateUrl: './topic-contribute-page.component.html',
  styleUrls: ['./topic-contribute-page.component.css']
})
export class TopicContributePageComponent implements OnInit {
  webConfig = WebConfig;
  apiUrl: string = environment.ApiEndPoint.replace("api/", "")

  modalRef: MdbModalRef<ContributeTopicModalComponent>;
  //modalRef1: MdbModalRef<ContributeModalExternalComponent>;
  modelRefs: MdbModalRef<ContributeSavedDraftComponent>;

  //public url3:{name:string, Title:string}[] = program;

  value: string;
  viewValue: string;
  public search = "";
  public ProgramLists = program;
  public programlistMaster = JSON.parse(JSON.stringify(program))
  public uploadForm: FormGroup;
  isPublished: boolean = false;
  gradeList: any
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  @ViewChild('draggable') private draggableElement: ElementRef;

  currentItem: any = undefined;

  listEdittext: boolean = true
  EditInput: boolean = true
  abc = "aaaa"
  ProgramSelect: boolean = true
  SelectProgramName: boolean = true
  setdisabled: true;
  //////
  isValid: boolean = false;
  listitem: any
  ProgramDetailList: any
  addremovebulk: boolean = true
  bulkeditfieldvalue: boolean = false
  textfieldlist: boolean = false
  textfieldBulk: boolean = false
  listeditfieldValue: boolean = true
  ItemBulk: boolean = false
  isShown: boolean = false
  isAdd: boolean = true
  isSelectAllShown: boolean = false
  boards: any
  grades: any
  categories: any
  checkboxesArray = []
  courses: any
  // listeditsLearningOutcome = [{ value: '' }] as any
  extContents = [] as any
  phoes = [] as any
  addBulkShow: boolean = false
  addListShow: boolean = false
  selectedFile: File

  Curriculums: any = [];
  GradesMasterList: any = [];
  SubjectsMasterList: any = [];
  coursesMasterList: any = [];


  dropdownSettings: any = {};
  dropdownList = [];
  selectedItems = [];

  dropdownSettingSingle: any = {};
  Hours: any = [];
  hoursSelected: any = [];
  Minutes: any = [];
  minutesSelected: any = [];
  topicLevel: any = [];
  TopicLevelSelected: any = [];
  programSelectList: any = {};
  selectedTags: any = [];
  Url: string;
  basicForm: FormGroup;
  // topicName: string;
  // description: string;
  disabled: boolean;

  isGradeEnable: boolean = false;
  isCourseEnable: boolean = false;
  isSubjectEnable: boolean = false;
  isCategoryEnable: boolean = false;
  isGradePhoeEnable: boolean = false;
  isCoursePhoeEnable: boolean = false;
  isTopicPhoeEnable: boolean = false;
  isSubTopicPhoeEnable: boolean = false;
  selectEstimateList: any;
  ExistingTopicAttachments: any = [];


  ngSelectOptions: any = {
    searchable: false,
    bindLabel: "title",
    closeOnSelect: false

  }

  constructor(private http: HttpClient,
    private svcMasterDataService: SvcMasterDataService,
    private svcCurriculumn: SvcCurriculumsService,
    private fb: FormBuilder, private modalService: MdbModalService,
    private svcGrade: SvcGradesService,
    private svcSubjects: SvcSubjectsService,
    private DialogConfirmService: DialogConfirmService,
    private _service: SvcTopicsService,
    private svcCourses: SvcCoursesService,
    private ngModalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private svcLocalStorage: SvcLocalStorageService,
    private modalServicedraft: MdbModalService,
    private svcWfManager: SvcWFManagerService,
  ) {

  }


  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
      this.basicForm = this.fb.group({
        topicName: ['', [Validators.required]],
        description: ['', [Validators.required,]],
        programSelectList: ['', [Validators.required]],
        GradeSelectList: ['', [Validators.required]],
        CourseSelectList: ['', [Validators.required]],
        SubjectSelectList: ['', [Validators.required]],
        hourList: ['', [Validators.required]],
        minuteList: ['', [Validators.required]],
        TopicLevel: ['', [Validators.required]],
        learningOutcomes: new FormArray([]),

        ExternalContents: new FormArray([]),
        BannerFile: ['', [Validators.required]],
        TopicTags: [[]],
        bulkeditsLearningOutcome: [''],
        Attachments: new FormArray([]),
      });
      this.addLearningoutcome();

      for (let hrs = 0; hrs <= 50; hrs++) {
        this.Hours.push({ id: hrs, title: hrs + ' Hour' },
        )
      }
      for (let minute = 0; minute <= 55; minute += 5) {
        this.Minutes.push({ id: minute, title: minute + (minute == 0 ? ' Minute' : ' Minute') },
        )
      }

      this.topicLevel = [
        { id: 1, title: 'Beginner' },
        { id: 2, title: 'Intermediate' },
        { id: 3, title: 'Expert' }
      ];

      this.svcCurriculumn.CurriculumGetBySchool().subscribe(result => {

        this.Curriculums = result;
        const id: any = this.route.snapshot.queryParamMap.get('id');
        if (id) {
          this.getTopics(id);
        }
      })
    });
  }

  currSelected: any = [];
  grdSelected: any = [];
  courseSelected: any = [];
  subjectSelected: any = [];
  isCoping: boolean = false;
  getTopics = async (id: number) => {
    let data: any = await this._service.TopicGetByParentId(id).toPromise();

    if (!data)
      data = await this._service.TopicGetById(id).toPromise();

    let isLoadPage = false;

    if (data) {
      this.currentItem = data;
      console.log(data)
      let userObj = this.svcLocalStorage.GetData(environment.AuthTokenKeyLSKey);
      const username = userObj ? `${(JSON.parse(userObj).username)}` : "";
      const isCopy: any = this.route.snapshot.queryParamMap.get('copy');
      this.isCoping = isCopy == "true";
      if ((data.createdbyuser.username == username && ["Draft", "Back to Initiator for update", WebConfig.topicStatusKey.Published].indexOf(data.status) > -1) || this.isCoping) {
        isLoadPage = true;
        this.isPublished = this.isCoping ? false : (data.status == WebConfig.topicStatusKey.Published);
        if (data.completionDuration && data.completionDuration > 0) {

          let hourSplit = parseFloat(data.completionDuration).toFixed(2).toString().split(".")[0];
          let minuteSplit = parseFloat(data.completionDuration).toFixed(2).toString().split(".")[1];

          this.hoursSelected = this.Hours.filter((x: any) => x.id == hourSplit)[0];
          this.minutesSelected = this.Minutes.filter((x: any) => x.id == minuteSplit)[0];
        }

        this.TopicLevelSelected = this.topicLevel.filter((x: any) => x.title == data.topicLevel);
        this.TopicLevelSelected = this.TopicLevelSelected.length > 0 ? this.TopicLevelSelected[0] : null;

        if (data.externalReferences && data.externalReferences.length > 0) {
          data.externalReferences.map((row: any) => {

            if (row.externalreference) {
              this.ExternalContentsField.push(
                this.fb.group({
                  Id: row.id,
                  Externalreference: [row.externalreference, [Validators.required]]
                })
              )
            }
          })
        }
        if (data.learningoutcomesList.length > 0) {

          let learningOutcoumitems = this.learningOutcomesField;
          this.learningOutcomesField.clear();
          data.learningoutcomesList.map((row: any) => {

            if (row.outcome) {
              learningOutcoumitems.push(
                this.fb.group({
                  Id: row.id,
                  isUserDefined: true,
                  Outcome: row.outcome
                })
              )
            }
          })
        }

        this.selectedTags = data.topicTags;

        this.currSelected = [];
        (data.curriculumIds || []).map((row: any) => {
          let val = this.Curriculums.filter((x: any) => x.id == row)[0]
          if (val) {
            this.currSelected.push(val);
          }
        })


        this.basicForm.patchValue({
          topicName: data.title,
          description: data.description,
          programSelectList: this.currSelected,
          hourList: this.hoursSelected,
          minuteList: this.minutesSelected,
          TopicLevel: this.TopicLevelSelected,
          TopicTags: data.topicTags,
          //GradeSelectList: this.grdSelected,
          // CourseSelectList,
          // SubjectSelectList
          BannerFile: data.bannerimageurl || "",
        });

        if (data.bannerimageurl)
          this.croppedImage = data.bannerimageurl;
        this.loadExistingAttachment();
        if (this.currSelected.length > 0)
          this.GradeGetFromServer(this.currSelected);
      }

      if (this.currentItem.status == 'Back to Initiator for update') {

        this.svcWfManager.GetWFTaskPendingByWFInstanceID(this.currentItem.wfInstanceId).subscribe((data: any) => {
          if (data.length > 0) {
            this.pendingWFTasks = data[0];
            this.svcWfManager.GetActionsforWFState(this.pendingWFTasks.currentstateid).subscribe((actions: any) => {
              this.actionsList = actions;
            })

          }
        })
      }
    }

    if (!isLoadPage)
      this.router.navigate(['my-dashboard']);
    // })
  }
  pendingWFTasks: any;
  actionsList: any;
  actionId: any;
  onActionTaken(actionsID: number, actionName: string) {

    this.actionId = actionsID;
    if (!this.pendingWFTasks.ischeckedout) {
      this.svcWfManager.CheckOutTask(this.pendingWFTasks.id).subscribe(data => {
        this.onSubmit(actionName, true)
      });
    } else {
      this.onSubmit(actionName, true)

    }

  }

  loadExistingAttachment() {
    this._service.TopicAttachmentsGetByTopic(this.currentItem.id).subscribe((row) => {
      this.ExistingTopicAttachments = row;

    })
  }
  onDeleteFileEmitter(item: any) {
    if (this.isPublished || this.isCoping) {
      this.ExistingTopicAttachments = this.ExistingTopicAttachments.filter((x: any) => x.id != item.id);
    } else {
      this.svcMasterDataService.FileDelete(item.id).subscribe(row => {
        this.ExistingTopicAttachments = this.ExistingTopicAttachments.filter((x: any) => x.id != item.id);
      })
    }

  }

  GradeGetFromServer(selectedProgramsValues: any = []) {

    let selectedPrograms: any = selectedProgramsValues;
    this.basicForm.patchValue({ programSelectList: selectedProgramsValues });
    this.isGradeEnable = selectedPrograms.length > 0;
    if (selectedPrograms.length > 0) {
      let selProgIds = selectedPrograms.map((r: any) => r.id);

      this.svcGrade.GradesGetByCurriculumId(selProgIds)
        .subscribe((grd: any) => {

          this.GradesMasterList = grd.map((result: any) => {
            result.title = result.gradename
            result.groupName = selectedPrograms.filter((row: any) => row.id == result.curriculaid)[0].title
            return result;
          })

          if (this.currentItem && this.currentItem.id) {
            this.currentItem.topicGrades.map((row: any) => {
              let val: any = this.GradesMasterList.filter((x: any) => x.id == row.id)[0];
              if (val)
                this.grdSelected = [...this.grdSelected, val]
            })
            console.log(this.grdSelected)

            if (this.grdSelected.length > 0) {
              this.SubjectsGetFromServer(this.grdSelected);
              this.basicForm.patchValue({
                GradeSelectList: this.grdSelected,
                // CourseSelectList,
                // SubjectSelectList
              });
            }
          }

        })
    } else {
      this.basicForm.patchValue({
        GradeSelectList: [],
        CourseSelectList: [],
        SubjectSelectList: []
      })
      this.grdSelected = [];
      this.subjectSelected = [];
      this.courseSelected = [];
      this.isSubjectEnable = false;
      this.isCourseEnable = false;
    }
  }
  SubjectsGetFromServer(selectedGradesVal: any = []) {
    this.basicForm.patchValue({ GradeSelectList: selectedGradesVal });
    this.isSubjectEnable = selectedGradesVal.length > 0;
    if (selectedGradesVal.length > 0) {
      console.log(selectedGradesVal.map((g: any) => g.id))
      this.svcSubjects.SubjectGetByGrades(selectedGradesVal.map((g: any) => g.id)).subscribe((result: any) => {
        this.SubjectsMasterList = result
        if (this.currentItem && this.currentItem.id) {

          // this.currentItem.topicSubject.map((row: any) => {
          //   this.subjectSelected.push(row)
          // })
          this.currentItem.topicSubject.map((row: any) => {
            this.subjectSelected = row;
          })

          if (this.subjectSelected) {
            this.CoursesGetFromServer(this.subjectSelected);
            this.basicForm.patchValue({
              SubjectSelectList: this.subjectSelected,
              // CourseSelectList,
              // SubjectSelectList
            });
          }
        }

      })


    }

    else {
      this.basicForm.patchValue({
        GradeSelectList: [],
        CourseSelectList: [],
        SubjectSelectList: []
      })
      this.subjectSelected = [];
      this.courseSelected = [];
      this.isSubjectEnable = false;
      this.isCourseEnable = false;
    }
  }
  CoursesGetFromServer(selectedSubjects: any = null) {
    selectedSubjects = selectedSubjects.id ? selectedSubjects : null;
    this.basicForm.patchValue({
      SubjectSelectList: selectedSubjects
    });
    let selectedGrades = this.basicForm.controls.GradeSelectList.value;
    if (selectedSubjects && selectedGrades.length > 0) {
      this.isCourseEnable = true;
      this.svcCourses.CoursesGetByGradeSubjectId(selectedGrades.map((w: any) => w.id), selectedSubjects.id).subscribe((result: any) => {
        this.coursesMasterList = result.map((course: any) => {
          return {
            id: course.courseId,
            title: course.courseName,
            groupName: course.courseGroupName
          }
        })

        if (this.currentItem && this.currentItem.id) {
          this.courseSelected = this.currentItem.topicCourses.map((row: any) => {
            return {
              id: row.courseId,
              title: row.courseName,
              groupName: row.courseGroupName
            }
          })
          if (this.courseSelected.length > 0) {
            this.basicForm.patchValue({
              CourseSelectList: this.courseSelected,
            });
          }
        }
      })
    }
    else {
      this.basicForm.patchValue({
        // GradeSelectList: [],
        CourseSelectList: [],
        SubjectSelectList: []
      })
      this.isCourseEnable = false;

    }
  }

  selectaddLearningoutcome() {
    let outcomeSubject = this.basicForm.controls['CourseSelectList'].value;
    let subjectList = outcomeSubject[outcomeSubject.length - 1]
    let items = this.learningOutcomesField;
    if (outcomeSubject.length == 1) {
      items.controls[0] = this.fb.group({
        Id: subjectList.id,
        Outcome: subjectList.title
      });
    }
    else {
      items.push(this.fb.group({
        Id: subjectList.id,
        Outcome: subjectList.title
      }));
    }
  }
  CategoryGetFromServer(selectedCourseSubject: any = []) {
    this.basicForm.patchValue(
      {
        CourseSelectList: selectedCourseSubject
      }
    )
    let selectedGrades = this.basicForm.controls.GradeSelectList.value;
    if (selectedCourseSubject.length > 0 && selectedGrades.length > 0) {

      let learningOutcomes = this.learningOutcomesField;

      let pastValues = learningOutcomes.value.filter((row: any) => row.isUserDefined)

      this.svcCourses.CourseLearningOutGetByCourseId(selectedCourseSubject.map((w: any) => w.id)).subscribe((result: any) => {
        learningOutcomes.clear();
        pastValues.map((item: any) => {
          if (item.Outcome)
            this.learningOutcomesField.push(this.fb.group(item))
        });
        result.map((item: any) => {

          this.learningOutcomesField.push(this.fb.group({
            Id: -1,
            isUserDefined: false,
            Outcome: item.outcome
          }))
          // return {
          //   id: course.courseId
          // }
        })
      })
    }
    else {
      let learningOutcomes = this.learningOutcomesField;
      learningOutcomes.clear();
      let pastValues = learningOutcomes.value.filter((row: any) => row.isUserDefined)
      pastValues.map((item: any) => {
        this.learningOutcomesField.push(this.fb.group(item))
      });
    }
    //   this.selectaddLearningoutcome()
    //this.removeLearningOutcome()

    //  console.log( this.selectaddLearningoutcome())
  }


  onCourseSelect(item: any, courseItem: string) {
    let arr = this.basicForm.controls.CourseSelectList.value;
    let isEnable: boolean = false;
    if (arr.length > 0) {
      if (courseItem == 'course') {
        this.isSubjectEnable = isEnable;
      }
    }
  }

  bannerRemove() {
    this.croppedImage = this.croppedImagePre;
    this.basicForm.patchValue({
      BannerFile: null,
    });
    this.editBannerText = false;
  }

  get learningOutcomesField() {

    return this.basicForm.get("learningOutcomes") as FormArray;
  }
  learningOutcomRemove(i: number) {
    this.DialogConfirmService.openConfirmDialog('Do you want to remove?')
      .afterClosed().subscribe(res => {
        if (res) {
          let items = this.learningOutcomesField;
          items.removeAt(i)

        }
      })
  }
  addLearningoutcome() {
    let items = this.learningOutcomesField;
    items.insert(0, this.fb.group({
      Id: 0,
      isUserDefined: true,
      Outcome: ''
    }));
  }


  get ExternalContentsField() {

    return this.basicForm.get("ExternalContents") as FormArray;
  }
  ExternalContentsRemove(i: number) {
    this.DialogConfirmService.openConfirmDialog('Do you want to remove?')
      .afterClosed().subscribe(res => {
        if (res) {
          let items = this.ExternalContentsField;
          items.removeAt(i)

        }
      })
  }
  ExternalContentsAdd() {

    let items = this.ExternalContentsField;
    items.push(this.fb.group({
      Id: 0,
      Externalreference: [null, [Validators.required]]
    }));
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.onUpload()
  }
  onUpload() {
    const fd = new FormData();
    fd.append('images', this.selectedFile, this.selectedFile.name);
    // this.http.post('../../../../assets/img/upload/',fd)
    this.http.post('./src/assets/img/upload/', fd)
      .subscribe(res => {

      });
  }
  uncheckAll() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.isShown = !this.isShown
    this.isAdd = !this.isAdd
  }
  checkAll() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = true;

    });

    this.isShown = !this.isShown
    this.isAdd = !this.isAdd

  }


  removeAll() {
    // this.checkboxes.forEach((element) => {
    // this.draggableElement.nativeElement.remove();
    this.checkboxesArray = this.checkboxes["_results"]
    let deleteCount = 0
    this.checkboxesArray.forEach((element, index) => {
      let isChecked = element["nativeElement"]["checked"]
      if (isChecked) {
        this.checkboxesArray.splice(index, 1)
        this.phoes.splice(index, 1)
        deleteCount++
      }

    })


  }

  programName: any;

  programlistitem(id: any) {
    var localGradesList = this.ProgramLists.filter((obj: { Id: any; }) => {
      return obj.Id === id;
    })
    this.gradeList = localGradesList[0].Grades;
    // this.coursesList = localGradesList[0].Courses
    // console.log(localGradesList[0].Courses)
    this.programName = localGradesList[0].Title;

  }

  // gradeListItem(id: any) {
  //   var localGradesListItem = this.gradeList.filter((obj: { Id: any; }) => {
  //     return obj.Id === id;
  //   })
  //   this.coursesList = localGradesListItem[0].Courses
  // }

  bulkeditclick() {
    // console.log(this.listeditsLearningOutcome);
    // this.bulkeditsLearningOutcome = this.listeditsLearningOutcome.map((x: any) => x.value).join("\n");
    this.listEdittext = false;

    this.basicForm.patchValue({
      bulkeditsLearningOutcome: this.basicForm.controls.learningOutcomes.value.filter((row: any) => row.Outcome).map((row: any) => row.Outcome).join("\n")
    })

  }

  listeditclick() {
    this.listEdittext = true;
    let learningOutcomes = this.learningOutcomesField;
    learningOutcomes.clear();
    this.basicForm.controls.bulkeditsLearningOutcome.value.split("\n").map((row: any) => {
      learningOutcomes.push(this.fb.group({
        Id: 0,
        Outcome: row
      }))
    })

    // this.listeditsLearningOutcome = this.bulkeditsLearningOutcome.split("\n").filter(x => x != "").map(x => {
    //   return { value: x }
    // });
    // if (this.listeditsLearningOutcome.length == 0) {
    //   this.listeditsLearningOutcome = [{ value: '' }]
    // }
  }
  url2: any[] = []
  changeFile(event: any) {
    if (event.target.files) {
      for (var i = 0; i < File.length; i++) {
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[i])
        reader.onload = (event: any) => {
          this.url2.push(event.target.result)
        }
      }
    }

  }
  getTextValue() {

  }
  openModal() {
    this.modalRef = this.modalService.open(ContributeTopicModalComponent)
  }
  validateAllFormFields(formGroup: FormGroup) {
    formGroup.markAllAsTouched();  //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  b64toBlob(ImageURL: any, sliceSize: any) {
    try {

      var block = ImageURL.split(";");
      // Get the content type of the image
      var contentType = block[0].split(":")[1];// In this case "image/gif"
      // get the real base64 content of the file
      var realData = block[1].split(",")[1];//
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(realData);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      var blob = new Blob(byteArrays, { type: contentType });
      return blob;
    } catch (e) {
      return "";
    }

  }

  public topicCreate(Status: string, updateWF: boolean) {
    debugger;

    const formdata = new FormData();


    let hours = this.basicForm.controls.hourList.value.id ? (this.basicForm.controls.hourList.value.id) : '';
    let minutes = this.basicForm.controls.minuteList.value.id ? (this.basicForm.controls.minuteList.value.id) : '';

    if (hours && minutes)
      formdata.append('CompletionDuration', `${hours}.${minutes}`);

    formdata.append('Description', this.basicForm.controls.description.value);
    formdata.append('Title', this.basicForm.controls.topicName.value);
    formdata.append('Status', Status);

    if (this.basicForm.controls.CourseSelectList.value.length > 0) {

      formdata.append('Courses', this.basicForm.controls.CourseSelectList.value.map((r: any) => r.title).join(','));
      this.basicForm.controls.CourseSelectList.value.map((r: any, idx: number) => {
        formdata.append(`CourseIds[${idx}]`, r.id);
      });
    }
    if (this.basicForm.controls.programSelectList.value.length > 0) {
      let selectedCurriculum = this.Curriculums.filter((x: any) => this.basicForm.controls.programSelectList.value.findIndex((y: any) => y.id == x.id) > -1);

      formdata.append('Curriculums', selectedCurriculum.map((r: any) => r.title).join(','));
      selectedCurriculum.map((r: any, idx: number) => {
        formdata.append(`CurriculumIds[${idx}]`, r.id);
      });

    }
    if (this.basicForm.controls.GradeSelectList.value.length > 0) {
      let selectedGrades = this.GradesMasterList.filter((x: any) => this.basicForm.controls.GradeSelectList.value.findIndex((y: any) => y.id == x.id) > -1);
      formdata.append('Grades', selectedGrades.map((r: any) => r.gradename).join(','));
      selectedGrades.map((r: any, idx: number) => {
        formdata.append(`GradeIds[${idx}]`, r.id);
      });
    }
    if (this.basicForm.controls.SubjectSelectList.value && this.basicForm.controls.SubjectSelectList.value.id) {
      formdata.append('Subject', this.basicForm.controls.SubjectSelectList.value.title);
      formdata.append(`SubjectId`, this.basicForm.controls.SubjectSelectList.value.id);
    }
    if (this.basicForm.controls.TopicLevel.value?.id)
      formdata.append('TopicLevel', this.basicForm.controls.TopicLevel.value.title);

    if (this.basicForm.controls.BannerFile.value) {
      formdata.append('BannerFile', this.b64toBlob(this.basicForm.controls.BannerFile.value, undefined));
    }
    this.basicForm.controls.learningOutcomes.value.filter((row: any) => row.Outcome).map((row: any, idx: number) => {
      formdata.append(`Learningoutcomes[${idx}].Id`, row.Id);
      formdata.append(`Learningoutcomes[${idx}].Outcome`, row.Outcome);
    })

    this.basicForm.controls.ExternalContents.value.filter((row: any) => row.Externalreference).map((row: any, idx: number) => {
      formdata.append(`ExternalReference[${idx}].Id`, row.Id);
      formdata.append(`ExternalReference[${idx}].Externalreference`, row.Externalreference);
    })
    this.basicForm.controls.TopicTags.value.filter((row: any) => (row.TagName || row.tagName)).map((row: any, idx: number) => {
      formdata.append(`TopicTags[${idx}].Id`, "0");
      formdata.append(`TopicTags[${idx}].TagName`, (row.TagName || row.tagName));
    })

    formdata.append('isCopying', this.isCoping.toString());

    if (this.isPublished || this.isCoping) {
      const id = this.currentItem.id.toString()
      formdata.append("ParentTopicId", id);
      this.currentItem.id = null;
      this.ExistingTopicAttachments.map((item: any, index: number) => {
        formdata.append(`AttachmentTopicIds[${index}]`, item.id.toString())
      })
    } else {
      formdata.append('ParentTopicId', this.currentItem?.parentTopicId || 0);
    }

    if (this.currentItem && this.currentItem.id > 0) {

      this._service.TopicUpdate(this.currentItem.id, formdata).toPromise().then((res: any) => {
        if (updateWF) {
          this._service.SubmitTopicTask(this.currentItem.id, this.pendingWFTasks.id, this.actionId, null).subscribe(data => { })
        }
        if (this.basicForm.controls.Attachments.value.length > 0) {

          this.uploadTopicAttachments(res.id, res.referenceId);
        } else {
          Swal.fire({
            title: 'Success',
            text: `Topic ${res.referenceId} Updated Successfully`,
            icon: 'success',
          }).then((result) => {
            this.router.navigate([WebConfig.PagesName.TeacherDashboard]);
          })

        }
      });
    }
    else {
      this._service.TopicCreate(formdata).toPromise().then((res: any) => {

        if (this.basicForm.controls.Attachments.value.length > 0) {
          this.uploadTopicAttachments(res.id, res.referenceId);

        } else {

          Swal.fire({
            title: 'Success',
            text: `Topic ${res.referenceId} Created Successfully`,
            icon: 'success',
          }).then((result) => {
            this.router.navigate(['my-dashboard']);
          })
        }

      }, err => {
        Swal.fire({
          title: 'Error!',
          text: 'Error Occured',
          icon: 'error',
        })
      });

    }

  }
  totalByte: number = 0;
  totalByteUploaded: number = 0;
  uploadedPercent: number = 0;
  totalAttachment: number = 0;
  uploadedAttachment: number = 0;

  @ViewChild('fileProcessModalOpenContent') fileProcessModalOpenContent: ElementRef
  async uploadTopicAttachments(topicId: number, referenceId: string) {
    let values = this.basicForm.value;
    values.Attachments.map((x: any) => {
      this.totalByte += x.fileItem.size;
      this.totalAttachment += 1;
    })
    if (this.totalAttachment > 0) {
      this.ngModalService.open(this.fileProcessModalOpenContent, { size: 'md', centered: true, backdrop: 'static', keyboard: false }).result.then((result) => {
        // this.closeResult = `Closed with: ${result}`;

      }, (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    for (let i = 0; i < values.Attachments.length; i++) {

      const formdata = new FormData();
      values.Attachments
      formdata.append(`fileItem`, values.Attachments[i].fileItem);
      formdata.append(`isDownloadable`, values.Attachments[i].isDownloadable);
      formdata.append(`topicId`, topicId.toString());
      await this._service.TopicAttachmentCreate(formdata).toPromise().then((event: HttpEvent<any>) => {

        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            console.log("uploaded", event.loaded)
            this.totalByteUploaded += event.loaded;
            // this.uploadedPercent = ((this.totalByteUploaded / this.totalByte) * 100)
            break;
          case HttpEventType.Response:
            this.uploadedAttachment += 1;
            this.uploadedPercent = ((this.uploadedAttachment / this.totalAttachment) * 100)
            console.log('User successfully created!', event.body);
          // setTimeout(() => {
          //   this.progress = 0;
          // }, 1500);

        }

      }, err => {

      });

    }

    this.ngModalService.dismissAll();
    Swal.fire({
      title: 'Success',
      text: `Topic ${referenceId} Updated Successfully`,
      icon: 'success',
    })
      .then((result) => {
        this.router.navigate([WebConfig.PagesName.TeacherDashboard]);
      })
  }
  attachmentError: boolean = false;
  public findInvalidControls() {
    const invalid = [];
    const controls = this.basicForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
  onSubmit(submittionType: string, updateWF: boolean) {

    // let values = this.basicForm.value;
    // console.log(values, this.basicForm.valid)
    // console.log(this.findInvalidControls())

    // debugger;
    //return this.validarteAllFormFields(this.basicForm);
    if (submittionType == "Draft") {
      if (!this.basicForm.value.BannerFile && this.croppedImage)
        this.basicForm.patchValue({
          BannerFile: this.croppedImage,
        })
      this.topicCreate(submittionType, false);
      return true;
    }
    else if (this.basicForm.value.Attachments.length == 0 && this.ExistingTopicAttachments.length == 0) {
      this.validateAllFormFields(this.basicForm);
      this.attachmentError = true;
    } else {
      this.validateAllFormFields(this.basicForm);
      if (this.basicForm.valid) {
        this.topicCreate(submittionType, updateWF);
        return true;
      }
    }
    return false;

  }

  openModalItem() {
    this.modalRef = this.modalService.open(ContributeTopicModalComponent)
  }

  // Banner
  cropperImagePopupOpen(content: any) {
    this.ngModalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  cropperImagePopupClose() {
    this.croppedImage = this.croppedImagePre;
    this.basicForm.patchValue({
      BannerFile: this.croppedImagePre,
    })
  }
  imageChangedEvent: any = '';
  croppedImagePre: any = '';
  croppedImage: any = '';
  bannerUploadPreImage = ""
  editBannerText: boolean = false;
  onCoverFileSelected(e: any) {
    this.imageChangedEvent = e;
    if (e.target.files) {
      this.editBannerText = true;

      var reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (event: any) => {
        this.bannerUploadPreImage = event.target.result;
        this.croppedImage = this.bannerUploadPreImage;
        // this.basicForm.patchValue({
        //   BannerFile: this.bannerUploadPreImage,
        // })
      }
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImagePre = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  keyPress(event: any) {
    const pattern = /[a-z/A-Z/0-9/-/ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onFormGroupChangeEvent(e: any) {

    this.basicForm.patchValue({
      TopicTags: e

    })
  }
  get attachmentField() {
    return this.basicForm.get("Attachments") as FormArray;
  }
  onAttachmentUploadChange(e: any) {
    let item = this.attachmentField;
    const files = item.value;
    item.clear();
    e.map((row: any) => {
      let exFile = files.filter((ex: any) => ex.fileItem.name == row.name)[0];
      item.push(this.fb.group({ isDownloadable: exFile ? exFile.isDownloadable : row.isDownloadable, id: row.id, fileItem: row }))
    });
    this.attachmentError = false;

  }
  onHourSelect(event: any) {
    this.basicForm.patchValue({ hourList: event.id ? event : null })
  }
  onMinuteSelect(event: any) {
    this.basicForm.patchValue({ minuteList: event.id ? event : null })
  }
  onTopicLevelSelect(event: any) {
    this.basicForm.patchValue({ TopicLevel: event.id ? event : null })
  }


}


