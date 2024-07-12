import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { ModalConfirmComponent } from "../../../modal/modal-confirm/modal-confirm.component";
import { MatDialog } from "@angular/material/dialog";
import { EducationService } from "../../../core/service/education.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SubmissionComponent } from "src/app/modules/classrooms/assignment/submission.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { element } from "protractor";
import { Constant_function_callContext } from "src/app/modules/design-hierarchy/verilog/ANTLR/VerilogParser";
import { MatSort, MatSortable } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-assignment-card",
  templateUrl: "./assignment-card.component.html",
  styleUrls: ["./assignment-card.component.scss"],
})
export class AssignmentCardComponent implements OnInit, OnChanges {
  @Input() public assignment: any;
  @Input() public classroom_id: string;
  @Input() deletedStatus: boolean;
  @Input() public isTeacher: boolean;
  @Output() getDeletedStatus: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public created: Date;
  public dueDate: Date;
  public id: string;
  public assignmentUser;
  public loading = true;
  public displayedColumns = [
    "title",
    "created",
    "dueDate",
    "submitted",
    "graded",
    "testsDone",
    "icon",
  ];
  public tableData = new MatTableDataSource<any>([]);
  pipe = new DatePipe("en-US");

  constructor(
    private dialog: MatDialog,
    private educationService: EducationService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.route.params.subscribe((params) => (this.id = params.id));
    this.deletedStatus = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["assignment"]) {
      let newData = [];
      this.assignment.forEach((element) => {
        newData.push({
          title: element.name,
          created: element.created,
          dueDate: element.dueDate,
          submitted: 18,
          graded: 18,
          icon: "more_vert",
        });
      });

      this.tableData.data = newData;
    }
  }

  private async deleteAssignment() {
    await this.educationService
      .deleteAssignment(this.assignment.classroom.uuid, this.assignment.uuid)
      .toPromise()
      .then(() => {
        this.deletedStatus = true;
        this.getDeletedStatus.emit(this.deletedStatus);
      });
  }

  public ngOnInit(): void {
    let newData = [];
    if (this.assignment[0].dueDate) {
      this.assignment.forEach((element) => {
        newData.push({
          title: element.name,
          created: element.created,
          dueDate: element.dueDate,
          submitted: element.published,
          graded: element.graded,
          testsDone: element.test,
          icon: "more_vert",
        });
      });
    } else {
      this.displayedColumns.pop();
      this.assignmentUser = this.assignment;

      this.assignmentUser.forEach((element) => {
        newData.push({
          title: element.assignment.name,
          created: element.assignment.created,
          dueDate: element.assignment.dueDate,
          submitted: element.published,
          graded: element.graded,
          testsDone: element.assignment.simulationPoints ? element.test : null,
        });
      });
    }

    this.tableData.data = newData;
    this.loading = false;
  }

  ngAfterViewInit() {
    this.tableData.sort = this.sort;
    this.tableData.sort.sort({ id: "created", start: "desc" } as MatSortable);
    this.tableData.paginator = this.paginator;
  }

  public onAssigmentSelected(assignment) {
    this.dialog
      .open(SubmissionComponent, {
        width: "1100px",
        data: assignment,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.snackbar.open("You have updated your assignment", null, {
            duration: 5000,
            verticalPosition: "bottom",
            horizontalPosition: "left",
          });

          // let newData = this.tableData.data;
          let assignmentUser = this.tableData.data.find(
            (obj) => obj.title === assignment.assignment.name
          );
          assignmentUser["submitted"] = new Date();
        }
      });
  }

  public onAssignmentInfoSelected(assignment: any) {
    this.router.navigate(["/assignments", assignment.uuid]);
  }

  public formatDate(date) {
    let response = date
      ? this.pipe.transform(new Date(date), "d MMMM y - HH:mm:ss")
      : "";

    return response;
  }

  public confirmAssignmentRemove(assignment: any): any {
    this.dialog
      .open(ModalConfirmComponent, {
        data: {
          message: `Are you sure you want to remove assignment ${assignment.title}?`,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.deleteAssignment();
        }
      });
  }

  public async publish() {
    await this.educationService
      .publishAssignment(
        this.assignment.classroom.uuid,
        this.assignment.uuid,
        true
      )
      .toPromise();
    this.assignment.published = true;
  }

  public async unpublish() {
    await this.educationService
      .publishAssignment(
        this.assignment.classroom.uuid,
        this.assignment.uuid,
        false
      )
      .toPromise();
    this.assignment.published = false;
  }

  isOverdue() {
    return this.assignmentUser
      ? new Date(this.assignmentUser.assignment.dueDate) < new Date()
      : new Date(this.assignment.dueDate) < new Date();
  }

  getMessage(): any {
    let message: string;

    if (this.assignment.published) {
      message = "Published, not graded";
    }

    if (!this.assignment.published) {
      message = "Not published";
    }

    if (!this.assignment.published && this.isOverdue()) {
      message = "Due date exceeded!";
    }

    if (this.assignment.published && this.assignment.graded) {
      message = "Published and graded";
    }

    return message;
  }

  findAssignmentByName(name) {
    if (this.assignmentUser) {
      return this.assignment.find((element) => element.assignment.name == name);
    }
    return this.assignment.find((element) => element.name == name);
  }
}
