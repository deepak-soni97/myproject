import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BearerInterceptor } from '@AppGuards/BearerInterceptor';

// import { HeaderComponent } from './header/header.component';
// import { CatalogComponent } from './catalog/catalog.component';
// import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
// import { HomeComponent } from './Views/Private/home/home.component';
// import { LatestTopicsComponent } from './latest-topics/latest-topics.component';
// import { TagListComponent } from './tag-list/tag-list.component';
// import { TopicsCardComponent } from './topics-card/topics-card.component';

import { AdminPagesExportsModule } from "@AppPages/admin-pages-exports.module";
import { PrivatePagesExportsModule } from "@AppPages/private-pages-exports.module";
import { AuthenticatPagesExportsModule } from "@AppPages/authenticat-pages-exports.module";
import { SharedComponentExportModule } from "@AppComponents/shared-component-export.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { TreeModule } from 'primeng/tree'
import { ErrorInterceptor } from '@AppGuards/ErrorInterceptor';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import {MatTableModule} from '@angular/material/table';


//import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,

    // HeaderComponent,
    // CatalogComponent,
    // MyDashboardComponent,
    // HomeComponent,
    // LatestTopicsComponent,
    // TagListComponent,
    // TopicsCardComponent

  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    AuthenticatPagesExportsModule,
    PrivatePagesExportsModule,
    AdminPagesExportsModule,
    SharedComponentExportModule,
    NgbModule,
    RouterModule.forRoot([], {onSameUrlNavigation: 'reload'}),
    CarouselModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatTreeModule,
    TreeModule,
    NgxPaginationModule,
    NgxDocViewerModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BearerInterceptor,
    multi: true
  }, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
