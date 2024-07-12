import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatRippleModule} from "@angular/material/core";
import {MatChipsModule} from "@angular/material/chips";
import {MatRadioModule} from "@angular/material/radio";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from '@angular/router';
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {OrganizationWalletComponent} from "./organization/wallet.component";
import {PersonalWalletComponent} from "./personal/wallet.component";
import {CoresModule} from "../cores/cores.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [OrganizationWalletComponent, PersonalWalletComponent],
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
    CoresModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  exports: [
    OrganizationWalletComponent
  ]
})
export class WalletModule {
}
