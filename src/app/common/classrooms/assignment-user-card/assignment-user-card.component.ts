import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { EducationService } from "../../../core/service/education.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-assignment-user-card",
  templateUrl: "./assignment-user-card.component.html",
  styleUrls: ["./assignment-user-card.component.scss"],
})
export class AssignmentUserCardComponent implements OnInit {
  @Input() public assignmentUsers: any;
  @Input() public classroom_id: string;
  @Input() deletedStatus: boolean;
  @Input() public isTeacher: boolean;
  @Output() getDeletedStatus: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  public created: string;
  public dueDate: string;
  public id: string;
  public loading = true;
  public displayedColumns = ["name", "submitted", "testComplete", "graded"];
  public tableData = new MatTableDataSource<any>([]);

  constructor(
    private educationService: EducationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => (this.id = params.id));
    this.deletedStatus = false;
  }

  public ngOnInit(): void {
    let newData = [];
    this.assignmentUsers.forEach((element) => {
      newData.push({
        name: element.author.firstName + " " + element.author.lastName,
        created: element.assignment.created,
        submitted: element.published,
        graded: element.graded,
        testComplete: element.assignment.simulationPoints ? element.test : null,
      });
    });

    this.tableData.data = newData;

    this.loading = false;
  }

  ngAfterViewInit() {
    this.tableData.sort = this.sort;
  }

  public onAssignmentInfoSelected(assignment: any) {
    this.router.navigate(["/assignments-user", assignment.uuid]);
  }

  // public async publish() {
  //   await this.educationService
  //     .publishAssignment(
  //       this.assignmentUsers.classroom.uuid,
  //       this.assignmentUsers.uuid,
  //       true
  //     )
  //     .toPromise()
  //     .then((data) => console.log("publish function", data));
  // }

  // public async unpublish() {
  //   await this.educationService
  //     .publishAssignment(
  //       this.assignmentUsers.classroom.uuid,
  //       this.assignmentUsers.uuid,
  //       false
  //     )
  //     .toPromise()
  //     .then((data) => console.log("unpublish function", data));
  // }

  findAssignmentByName(name) {
    return this.assignmentUsers.find(
      (element) =>
        element.author.firstName + " " + element.author.lastName == name
    );
  }
}
