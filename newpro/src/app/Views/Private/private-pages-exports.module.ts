import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from "./home-page/home-page.component";
import { SearchTopicPageComponent } from './search-topic-page/search-topic-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { TeacherProfileViewPageComponent } from './teacher-profile-view-page/teacher-profile-view-page.component';
import { TeacherProfileEditPageComponent } from './teacher-profile-edit-page/teacher-profile-edit-page.component'
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SharedComponentExportModule } from "@AppComponents/shared-component-export.module";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DataTablesModule } from 'angular-datatables';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TopicDetailPageComponent } from './topic-detail-page/topic-detail-page.component';
import { SavedTopicsPageComponent } from './saved-topics-page/saved-topics-page.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { NgInit } from "../../DirectivePipes/ng-init.directive"
import { AuthGuard } from '@AppGuards/auth.guard';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TreeModule } from 'primeng/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PrivateTemplateComponent } from './private-template/private-template.component';
import { WebConfig } from '@AppConfigs/WebConfig';
import { FileViwerPageComponent } from './file-viwer-page/file-viwer-page.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StudentProfileViewComponent } from './student-profile-view/student-profile-view.component';
import { StudentProfileEditComponent } from './student-profile-edit/student-profile-edit.component';



const appRoutes: Routes = [
  {
    path: '',
    component: PrivateTemplateComponent,

    children: [
      {
        path: '', component: HomePageComponent, canActivate: [AuthGuard], data: {
          roles: ['student', 'teacher', 'admin']
        }
      },
      {
        path: WebConfig.PagesName.SearchPage, component: SearchTopicPageComponent, canActivate: [AuthGuard]
        , data: {
          roles: ['student', 'teacher', 'admin']
        }
      },
      {
        path: WebConfig.PagesName.Cataloge, component: CatalogPageComponent, canActivate: [AuthGuard], data: {
          roles: ['student', 'teacher', 'admin']
        }
      },
      {
        path: WebConfig.PagesName.TeacherProfile, component: TeacherProfileViewPageComponent, canActivate: [AuthGuard], data: {
          roles: ['teacher','student']
        }
      },
      {
        path: WebConfig.PagesName.TeacherProfileEdit, component: TeacherProfileEditPageComponent, canActivate: [AuthGuard]
        , data: {
          roles: ['teacher']
        }
      },
      {
        path: WebConfig.PagesName.TopicDetailById, component: TopicDetailPageComponent, canActivate: [AuthGuard]
        , data: {
          roles: ['student', 'teacher', 'admin']
        }
      },
      {
        path: WebConfig.PagesName.SavedTopic, component: SavedTopicsPageComponent, canActivate: [AuthGuard], data: {
          roles: ['student', 'teacher']
        }
      },
      {
        path: WebConfig.PagesName.FileViewerPage, component: FileViwerPageComponent, canActivate: [AuthGuard], data: {
          roles: ['student', 'teacher', 'admin']
        }
      },
      {
        path: WebConfig.PagesName.changePassword, component: ChangePasswordComponent, canActivate: [AuthGuard], data: {
          roles: ['student', 'teacher', 'admin']
        }
      },
      {
        path: WebConfig.PagesName.StudentProfile, component: StudentProfileViewComponent, canActivate: [AuthGuard], data: {
          roles: ['student']
        }
      },
      {
        path: WebConfig.PagesName.StudentProfileEdit, component: StudentProfileEditComponent, canActivate: [AuthGuard], data: {
          roles: ['student']
        }
      },
      //{ path: '', redirectTo: '/', pathMatch: 'full' },
    ]
  }
];


@NgModule({
  declarations: [HomePageComponent,
    SearchTopicPageComponent,
    CatalogPageComponent,
    TeacherProfileViewPageComponent,
    TeacherProfileEditPageComponent,
    TopicDetailPageComponent,
    SavedTopicsPageComponent,
    NgInit,
    ChangePasswordComponent,
    PrivateTemplateComponent,
    FileViwerPageComponent,
    StudentProfileViewComponent,
    StudentProfileEditComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatTableModule,
    DataTablesModule,
    SharedComponentExportModule,
    RouterModule.forRoot(appRoutes, { anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' }),
    FormsModule,
    CKEditorModule,
    CarouselModule,
    MdbAccordionModule,
    MatIconModule,
    MatTreeModule,
    TreeModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NgxSliderModule,

    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatCheckboxModule,
  ],
  exports: [HomePageComponent,
    SearchTopicPageComponent,
    CatalogPageComponent,
    TeacherProfileViewPageComponent,
    TeacherProfileEditPageComponent,
    TopicDetailPageComponent
  ]
})
export class PrivatePagesExportsModule { }
