import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../core/service";
import { MatDialog } from "@angular/material/dialog";
import { ModalAddClassroomComponent } from "../../modal/modal-add-classroom/modal-add-classroom.component";
import { ModalJoinClassroomComponent } from "../../modal/modal-join-classroom/modal-join-classroom.component";
import { PageEvent } from "@angular/material/paginator";
import { EducationService } from "src/app/core/service/education.service";
import { ModalConfirmComponent } from "src/app/modal/modal-confirm/modal-confirm.component";
import { ClassroomSettingsComponent } from "./classroom-settings/classroom-settings.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Classroom } from "src/app/api/models/classroom/classroom";

@Component({
  selector: "app-classroom",
  templateUrl: "./classrooms.component.html",
  styleUrls: ["./classrooms.component.scss"],
})
export class ClassroomsComponent implements OnInit {
  public classrooms: any[] = [];
  public currentUser;
  public loadingState: boolean = true;

  public pageLength = 0;
  public pageIndex = 0;
  public pageSize = 12;

  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private educationService: EducationService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.currentUser = this.authenticationService.currentUser;
  }

  public async ngOnInit() {
    this.getClassrooms();
  }

  /**
   * Event handler for selecting a classroom card
   * @param classroom - Selected classroom
   */
  public onClassroomSelected(classroom: Classroom) {
    this.router.navigate(["/classrooms", classroom.uuid]);
  }

  /**
   * Event hander for clicking on delete classroom button
   * @param classroom - Selected classroom
   */
  public onClassroomDeleted(classroom: any) {
    this.dialog
      .open(ModalConfirmComponent, {
        data: {
          message: `Are you sure you want to delete classroom "${classroom.name}"?`,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.deleteClassroom(classroom);
        }
      });
  }

  /**
   * Event handler for clicking on classroom settings button
   * @param classroom - Selected classroom
   */
  public onClassroomSettingsSelected(classroom: any) {
    const dialogRef = this.dialog.open(ClassroomSettingsComponent, {
      width: "auto",
      data: classroom,
    });

    dialogRef.afterClosed().subscribe((r) => {
      if (r) {
        this.classrooms = [];
        this.loadingState = true;
        this.getClassrooms();
        this.loadingState = false;
      }
    });
  }

  public openAddClassroomDialog(): void {
    const dialogRef = this.dialog.open(ModalAddClassroomComponent, {
      width: "600px",
      data: {},
    });

    dialogRef.afterClosed().subscribe((r) => {
      if (r) {
        this.snackbar.open("A new classroom has been created!", null, {
          duration: 5000,
          verticalPosition: "bottom",
          horizontalPosition: "left",
        });

        this.loadingState = true;
        this.classrooms = [];
        this.getClassrooms();
        this.loadingState = false;
      }
    });
  }

  public openJoinClassroomDialog(): void {
    const dialogRef = this.dialog.open(ModalJoinClassroomComponent, {
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((r) => {
      if (r) {
        this.snackbar.open("You have joined a new classroom!", null, {
          duration: 5000,
          verticalPosition: "bottom",
          horizontalPosition: "left",
        });

        this.loadingState = true;
        this.classrooms = [];
        this.getClassrooms();
        this.loadingState = false;
      }
    });
  }

  /**
   * Event handler for paginator interaction
   * @param event - Paginator attributes
   */
  public pageEvent(event: PageEvent) {
    this.classrooms = [];
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getClassrooms();
  }

  private async deleteClassroom(classroom: any) {
    const response = await this.educationService.deleteClassroom(
      classroom.uuid
    );
    response.subscribe(
      (r) => {
        this.snackbar.open("Classroom has been deleted!", null, {
          duration: 5000,
          verticalPosition: "bottom",
          horizontalPosition: "left",
        });

        this.loadingState = true;
        this.getClassrooms();
        this.loadingState = false;
      },
      (error) =>
        this.snackbar.open(error, null, {
          duration: 5000,
          verticalPosition: "bottom",
          horizontalPosition: "left",
        })
    );
  }

  private async getClassrooms() {
    this.loadingState = true;
    const response = await this.educationService
      .getAllClassrooms(this.pageIndex, this.pageSize)
      .toPromise();

    this.pageLength = response.totalElements;
    this.classrooms = response.content;
    this.loadingState = false;
  }
}
