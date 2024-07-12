import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../core/service";
import { User } from "src/app/api/models/user";
import { MatDialog } from "@angular/material/dialog";
import { ModalInviteStudentsComponent } from "../../../modal/modal-invite-students/modal-invite-students.component";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalCreateAssignmentComponent } from "../../../modal/modal-create-assignment/modal-create-assignment.component";
import { ModalConfirmComponent } from "src/app/modal/modal-confirm/modal-confirm.component";
import { EducationService } from "src/app/core/service/education.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UUID } from "antlr4ts/misc/UUID";

import { CalendarOptions, EventInput } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { ModalClassroomStudentsComponent } from "src/app/modal/modal-classroom-students/modal-classroom-students.component";

@Component({
  selector: "app-classroom",
  templateUrl: "./classroom.component.html",
  styleUrls: ["./classroom.component.scss"],
})
export class ClassroomComponent implements OnInit {
  public classroom: any;
  public students: User[] = [];
  public teachers: User[] = [];
  public assignments: any[] = [];

  public loadingState: boolean = true;
  public uuid: UUID;
  public currentUser: any;
  public isTeacher: boolean;
  public memberships: any = [];
  public membsers: any = [];

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: { left: "title", right: "prev,next" },
    initialView: "dayGridMonth",
    weekends: true,
    windowResize: function (arg) {},
    contentHeight: 600,
  };
  calendarEvents: EventInput[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private educationService: EducationService,
    private snackbar: MatSnackBar
  ) {
    this.route.params.subscribe((params) => {
      this.uuid = params.id;
    });
  }

  public ngOnInit() {
    this.loadingState = true;
    this.showPage();
  }

  public showPage() {
    this.currentUser = this.authenticationService.currentUser;
    this.educationService
      .getClassroomDetails(this.uuid)
      .toPromise()
      .then((res) => {
        this.classroom = Object.assign({}, res);
        this.getStudentPage();
        this.educationService
          .getOwnerClassrooms(this.currentUser.username)
          .toPromise()
          .then((res: any) => {
            this.memberships = res.content;
            if (this.memberships.length <= 0) {
              this.isTeacher = false;
            }
            for (let classroomMembership of this.memberships) {
              if (classroomMembership.uuid == this.classroom.uuid) {
                this.isTeacher = true;
              }
            }
            this.getAssignmentPage();
          });
      });
  }

  public assignementDeletionStatus(event: any) {
    if (event) {
      this.getAssignmentPage();
    }
  }

  public openInvitationDialog(): void {
    this.dialog.open(ModalInviteStudentsComponent, {
      width: "1000px",
      data: {},
    });
  }

  public openCreateAssignmentDialog(): void {
    const dialogRef: any = this.dialog.open(ModalCreateAssignmentComponent, {
      width: "655px",
      maxHeight: "700px",
      data: {
        uuid: this.classroom.uuid,
        students: this.students,
      },
    });

    dialogRef.afterClosed().subscribe((r) => {
      if (r) {
        this.snackbar.open("A new assignment has been created!", null, {
          duration: 5000,
          verticalPosition: "bottom",
          horizontalPosition: "left",
        });

        this.assignments = [...this.assignments, r];
        const newEvent: EventInput = {
          title: r.name,
          start: this.formatDate(r.created),
          end: this.formatDate(r.dueDate),
        };
        this.calendarEvents = [...this.calendarEvents, newEvent];
      }
    });
  }

  /**
   * Event handler for deleting a student from classroom
   * @param student - Selected student
   */

  // public deleteStudent(student: User) {
  //   this.dialog
  //     .open(ModalConfirmComponent, {
  //       data: {
  //         message: `Are you sure you want to remove ${student.firstName} ${student.lastName} from your classroom?`,
  //       },
  //     })
  //     .afterClosed()
  //     .subscribe((result) => {
  //       if (result) {
  //         this.educationService
  //           .deleteClassroomMember(this.classroom.uuid, student.uuid)
  //           .subscribe(
  //             (res) => {
  //               if (this.students.length === 1) {
  //                 this.dialog.closeAll();
  //               } else {
  //                 this.getStudentPage();
  //               }
  //             },
  //             (error) => {}
  //           );
  //       }
  //     });
  // }

  private async getStudentPage() {
    await this.educationService
      .getClassroomMembers(this.classroom.uuid)
      .toPromise()
      .then((data: any) => {
        this.membsers = data;
        this.students = this.membsers.filter(
          (member) => member.permission == "STUDENT"
        );
        this.teachers = this.membsers.filter(
          (member) => member.permission == "OWNER"
        );
      });
  }

  public showStudentsModel() {
    this.dialog.open(ModalClassroomStudentsComponent, {
      data: {
        students: this.students,
        teachers: this.teachers,
      },
      width: "350px",
    });
  }

  private async getAssignmentPage() {
    this.calendarEvents = [];
    if (this.isTeacher) {
      const response: any = await this.educationService
        .getAllClassroomAssignments(this.classroom.uuid)
        .toPromise();
      this.loadingState = false;
      this.assignments = [];
      response.forEach((element) => {
        this.assignments.push(element);
        const newEvent: EventInput = {
          title: element.name,
          start: this.formatDate(element.created),
          end: this.formatDate(element.dueDate),
        };
        this.calendarEvents = [...this.calendarEvents, newEvent];
      });
      this.loadingState = false;
    } else {
      const response: any = await this.educationService
        .getAssignmentUsersByClassroom(this.classroom.uuid)
        .toPromise();
      this.loadingState = false;
      this.assignments = [];
      this.assignments = response;
      response.forEach((assignmentUser) => {
        const newEvent: EventInput = {
          title: assignmentUser.assignment.name,
          start: this.formatDate(assignmentUser.assignment.created),
          end: this.formatDate(assignmentUser.assignment.dueDate),
          color: this.getStateColor(assignmentUser),
        };

        this.calendarEvents = [...this.calendarEvents, newEvent];
      });
    }
  }

  getStateColor(assignmentUser): string {
    let stateColor: string;
    if (assignmentUser.published) {
      stateColor = "rgb(212, 212, 130)";
    }

    if (!assignmentUser.published) {
      stateColor = "lightgray";
    }

    if (
      !assignmentUser.published &&
      new Date(assignmentUser.assignment.dueDate) < new Date()
    ) {
      stateColor = "red";
    }

    if (assignmentUser.published && assignmentUser.graded) {
      stateColor = "green";
    }

    return stateColor;
  }

  formatDate(date: string): string {
    return new Date(date).toISOString().replace(/T.*$/, "");
  }
}
