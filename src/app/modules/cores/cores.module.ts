import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {CoreListingComponent} from './public/listing/listing.component';
import {CoreDetailComponent} from './public/detail/detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {ListCardSkeletonComponent} from './public/skeletons/list-card/list-card.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRippleModule} from '@angular/material/core';
import {PriceFormatPipe} from './public/pipes/price-format.pipe';
import {MatChipsModule} from '@angular/material/chips';
import {DetailSkeletonComponent} from './public/skeletons/detail/detail.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {CoreCreateComponent} from './my/create/create.component';
import {MyCoreListingComponent} from './my/listing/listing.component';
import {MyCoreVersionsComponent} from './my/versions/versions.component';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MyCoreEditComponent} from './my/edit/edit.component';
import {PurchasedCoreListingComponent} from './purchased/listing/listing.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MyCoreUsagesComponent} from './my/usages/usages.component';
import {QuillModule} from "ngx-quill";

@NgModule({
  declarations: [
    PurchasedCoreListingComponent,
    CoreCreateComponent,
    MyCoreListingComponent,
    MyCoreVersionsComponent,
    MyCoreEditComponent,
    MyCoreUsagesComponent,
    CoreListingComponent,
    CoreDetailComponent,
    ListCardSkeletonComponent,
    PriceFormatPipe,
    DetailSkeletonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxSliderModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
    RouterModule,
    MatRippleModule,
    MatChipsModule,
    MatRadioModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatProgressBarModule,
    QuillModule
  ],
  exports: [
    PriceFormatPipe
  ]
})
export class CoresModule {
}
