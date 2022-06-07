import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component'
import { RouterModule, Routes } from '@angular/router';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ButtonTagComponent } from './button-tag/button-tag.component';
import { HomeTagContainerComponent } from './home-tag-container/home-tag-container.component';
import { TopicSearchCardComponent } from './topic-search-card/topic-search-card.component';
import { FooterComponent } from './footer/footer.component';
import { ContributeStateCardComponentComponent } from './contribute-state-card-component/contribute-state-card-component.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { NgxStarsModule } from 'ngx-stars';
import { ContributeAddTagsComponent } from './contribute-add-tags/contribute-add-tags.component';
import { ContributeTopicModalComponent } from './contribute-topic-modal/contribute-topic-modal.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipListItemsComponent } from './mat-chip-list-items/mat-chip-list-items.component';
import { ModalTopicContributeComponent } from './modal-topic-contribute/modal-topic-contribute.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { RelatedTileComponent } from './related-tile/related-tile.component';
import { MatcConfirmDialogComponent } from './matc-confirm-dialog/matc-confirm-dialog.component';
import { MultipleFileUploadComponent } from './multiple-file-upload/multiple-file-upload.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { PageLoaderCompComponent } from './page-loader-comp/page-loader-comp.component';
import { ContributeSavedDraftComponent } from './contribute-saved-draft/contribute-saved-draft.component';
import { TopicCommentListComponent } from './topic-comment-list/topic-comment-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherProfileEditModalComponent } from './teacher-profile-edit-modal/teacher-profile-edit-modal.component';
import { FormsModule } from '@angular/forms';
import { PlyrModule } from 'ngx-plyr';
import { RecommendedTopicsComponent } from './recommended-topics/recommended-topics.component';
import { RelatedTopicsComponent } from './related-topics/related-topics.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { TokenValidationComponent } from './token-validation/token-validation.component';
import { MultiselectDropdownComponent } from './multiselect-dropdown/multiselect-dropdown.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ExistingAttachmentComponent } from './existing-attachment/existing-attachment.component';
import { LoaderCardComponent } from './loader-card/loader-card.component';
import { ShareTopicComponent } from './share-topic/share-topic.component';

@NgModule({
  declarations: [HeaderComponent, HomeBannerComponent, ButtonTagComponent, HomeTagContainerComponent, TopicSearchCardComponent, FooterComponent, ContributeStateCardComponentComponent, StarRatingComponent, MatChipListItemsComponent, ModalTopicContributeComponent, ContributeTopicModalComponent, ContributeAddTagsComponent, RelatedTileComponent, MatcConfirmDialogComponent, MultipleFileUploadComponent, PageLoaderCompComponent, ContributeSavedDraftComponent, TopicCommentListComponent, TeacherProfileEditModalComponent, RecommendedTopicsComponent, RelatedTopicsComponent, TokenValidationComponent,
    MultiselectDropdownComponent, FileViewerComponent, ExistingAttachmentComponent, LoaderCardComponent, ShareTopicComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    MatCarouselModule.forRoot(),
    NgxStarsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    ImageCropperModule,
    NgMultiSelectDropDownModule,
    MdbModalModule,
    MatDialogModule,
    FileUploadModule,
    MatOptionModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    NgSelectModule,
    NgxDocViewerModule,
    PlyrModule

  ],
  exports: [HeaderComponent, HomeBannerComponent, ButtonTagComponent,
    HomeTagContainerComponent, TopicSearchCardComponent, FooterComponent, ContributeStateCardComponentComponent, StarRatingComponent, ContributeAddTagsComponent, ContributeTopicModalComponent,
    RelatedTileComponent, MultipleFileUploadComponent, PageLoaderCompComponent,
    TopicCommentListComponent, RecommendedTopicsComponent, RelatedTopicsComponent,
    TokenValidationComponent, MultiselectDropdownComponent, FileViewerComponent, ExistingAttachmentComponent, LoaderCardComponent,ShareTopicComponent]
})
export class SharedComponentExportModule { }
