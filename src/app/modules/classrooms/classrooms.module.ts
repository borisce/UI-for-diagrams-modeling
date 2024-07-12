import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FullCalendarModule } from "@fullcalendar/angular";
import { ClassroomComponent } from "./classroom/classroom.component";
import { ClassroomsComponent } from "./classrooms.component";
import { ClassroomCardComponent } from "src/app/common/classrooms/classroom-card/classroom-card.component";
import { ModalAddClassroomComponent } from "src/app/modal/modal-add-classroom/modal-add-classroom.component";
import { AssignmentCardComponent } from "src/app/common/classrooms/assignment-card/assignment-card.component";
import { ClassroomSettingsComponent } from "./classroom-settings/classroom-settings.component";
import { ModalJoinClassroomComponent } from "src/app/modal/modal-join-classroom/modal-join-classroom.component";
import { SubmissionComponent } from "./assignment/submission.component";
import { ModalClassroomChangepwdComponent } from "src/app/modal/modal-classroom-changepwd/modal-classroom-changepwd.component";
import { AssignmentsComponent } from "./assignment/assignments/assignments.component";
import { AssignmentUserCardComponent } from "src/app/common/classrooms/assignment-user-card/assignment-user-card.component";
import { AssignmentUserComponent } from "./assignment/assignment-user/assignment-user.component";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "src/app/shared/shared.module";
import { EditorModule } from "../editor/editor.module";
import { EducationService } from "src/app/core/service/education.service";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatCardModule } from "@angular/material/card";
import { PointsCardComponent } from "src/app/common/classrooms/points-card/points-card.component";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { ModalClassroomStudentsComponent } from "src/app/modal/modal-classroom-students/modal-classroom-students.component";

@NgModule({
  declarations: [
    ClassroomComponent,
    ClassroomsComponent,
    ClassroomCardComponent,
    ModalAddClassroomComponent,
    AssignmentCardComponent,
    ClassroomSettingsComponent,
    ModalJoinClassroomComponent,
    SubmissionComponent,
    ModalClassroomChangepwdComponent,
    AssignmentsComponent,
    AssignmentUserCardComponent,
    AssignmentUserComponent,
    PointsCardComponent,
    ModalClassroomStudentsComponent,
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    FullCalendarModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    EditorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    PdfViewerModule,
  ],
  providers: [EducationService],
})
export class ClassroomsModule {}
