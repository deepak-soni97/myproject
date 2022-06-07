import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { TopicContributePageComponent } from './topic-contribute-page/topic-contribute-page.component';
import { MySpacePageComponent } from './my-space-page/my-space-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentExportModule } from "@AppComponents/shared-component-export.module"
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { SchoolDashboardPageComponent } from './school-dashboard-page/school-dashboard-page.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardLineChartComponent } from './school-dashboard-page/dashboard-line-chart/dashboard-line-chart.component';
import { DashboardDoughnutChartComponent } from './school-dashboard-page/dashboard-doughnut-chart/dashboard-doughnut-chart.component';
import { NgxDonutChartModule } from 'ngx-doughnut-chart';
import { DashboardProgressBarComponent } from './school-dashboard-page/dashboard-progress-bar/dashboard-progress-bar.component';
import { IgxProgressBarModule } from "igniteui-angular";
import { TopicContributePageComponent } from './topic-contribute-page/topic-contribute-page.component';
import { AuthGuard } from '@AppGuards/auth.guard';
import { MatcConfirmDialogComponent } from '@AppComponents/matc-confirm-dialog/matc-confirm-dialog.component';
import { TopicApprovalComponent } from './topic-approval/topic-approval.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { OrderModule } from 'ngx-order-pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
// import { MatInputModule } from '@angular/material';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { WebConfig } from '@AppConfigs/WebConfig';
import { TopicContributionPageComponent } from './topic-contribution-page/topic-contribution-page.component';
import { MasterLearningOutcomeComponent } from './master-learning-outcome/master-learning-outcome.component';
import { AdministratorHomeComponent } from './administrator-home/administrator-home.component';
import { SchoolManagementComponent } from './school-management/school-management.component';
import { CurriculumManagementComponent } from './curriculum-management/curriculum-management.component';
import { GradeManagementComponent } from './grade-management/grade-management.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ApproverManagementComponent } from "./approver-management/approver-management.component";
import { CurriculumApproversManagementComponent } from './curriculum-approvers-management/curriculum-approvers-management.component';
import { SchoolsApproversManagementComponent } from './schools-approvers-management/schools-approvers-management.component';
import { SubjectManagementComponent } from './subject-management/subject-management.component';
import { NgSelectModule } from '@ng-select/ng-select';



const appRoutes: Routes = [
  {
    path: '',
    component: AdminTemplateComponent,
    children: [
      {
        path: WebConfig.PagesName.ContributeTopic, component: TopicContributePageComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['teacher']
        }
      },
      {
        path: "contribute-topic-old", component: TopicContributePageComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['teacher']
        }
      },
      {
        path: WebConfig.PagesName.TeacherDashboard, component: MySpacePageComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['teacher']
        }
      },
      {
        path: WebConfig.PagesName.AdminDashboard, component: SchoolDashboardPageComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: WebConfig.PagesName.TopicApproval, component: TopicApprovalComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['teacher']
        }
      },
      {
        path: WebConfig.PagesName.schoolManagement, component: SchoolManagementComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: WebConfig.PagesName.curriculumManagement, component: CurriculumManagementComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: WebConfig.PagesName.gradeManagement, component: GradeManagementComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: WebConfig.PagesName.courseManagement, component: CourseManagementComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: WebConfig.PagesName.learningOutcomes, component: MasterLearningOutcomeComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: WebConfig.PagesName.userManagement, component: UserManagementComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: WebConfig.PagesName.approverManagement, component: ApproverManagementComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: WebConfig.PagesName.schoolApproverManagement, component:SchoolsApproversManagementComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: WebConfig.PagesName.curricluaApproverManagement, component: CurriculumApproversManagementComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['admin']
        }
      },
      {
        path: WebConfig.PagesName.subjectManagement, component: SubjectManagementComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['admin']
        }
      },
       {
        path: WebConfig.PagesName.AdministratorHome, component: AdministratorHomeComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['admin']
        }
      },
    ]
  }


  // { path: 'contribute-topic/:id', component: TopicContributePageComponent,canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    TopicContributePageComponent,
    MySpacePageComponent,
    SchoolDashboardPageComponent,
    DashboardLineChartComponent,
    DashboardDoughnutChartComponent,
    DashboardProgressBarComponent,
    TopicApprovalComponent,
    AdminTemplateComponent,
    TopicContributionPageComponent,
    MasterLearningOutcomeComponent,
    AdministratorHomeComponent,
    SchoolManagementComponent,
    CurriculumManagementComponent,
    GradeManagementComponent,
    CourseManagementComponent,
    UserManagementComponent,
    ApproverManagementComponent,
    CurriculumApproversManagementComponent,
    SchoolsApproversManagementComponent,
    SubjectManagementComponent,
  ],
  imports: [
    MatSlideToggleModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
    SharedComponentExportModule,
    
    NgxTypeaheadModule,
    NgMultiSelectDropDownModule.forRoot(),
    MdbModalModule,
    ImageCropperModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    NgxChartsModule,
    BrowserModule,
    NgxDonutChartModule,
    IgxProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    NgxPaginationModule,
    OrderModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    NgSelectModule
  ],

  exports: [
    // TopicContributePageComponent
    MySpacePageComponent,
    SchoolDashboardPageComponent,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  entryComponents: [
    MatcConfirmDialogComponent
  ]
})
export class AdminPagesExportsModule { }

// platformBrowserDynamic().bootstrapModule(AdminPagesExportsModule);

