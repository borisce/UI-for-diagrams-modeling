import {NgModule} from '@angular/core';
import {OrderCreateComponent} from "./create/create.component";
import {CoresModule} from "../cores/cores.module";
import {DatePipe, JsonPipe, KeyValuePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {OrderDetailComponent} from "./detail/detail.component";
import {RouterModule} from '@angular/router';
import {OrderListComponent} from "./list/list.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [OrderCreateComponent, OrderDetailComponent, OrderListComponent],
  imports: [
    CoresModule,
    NgForOf,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
    MatSelectModule,
    FormsModule,
    KeyValuePipe,
    MatRadioModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    DatePipe,
    JsonPipe,
    MatProgressBarModule,
    NgSwitch,
    NgSwitchCase,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSlideToggleModule,
  ],
  exports: []
})
export class OrderModule {
}
