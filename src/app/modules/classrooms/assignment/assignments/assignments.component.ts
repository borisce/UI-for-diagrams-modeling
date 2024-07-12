import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UUID } from "antlr4ts/misc";
import Chart from "chart.js/auto";
import { AuthenticationService } from "src/app/core/service";
import { EducationService } from "src/app/core/service/education.service";

type assignmentUser = {
  id: any;
  assignment: any;
  author: any;
  created: any;
  createdBy: any;
  lastAccountEdit: any;
  lastLogin: any;
  lastModified: any;
  lastModifiedBy: any;
  published: any;
  submitDate: any;
  uuid: any;
};
@Component({
  selector: "app-assignments",
  templateUrl: "./assignments.component.html",
  styleUrls: ["./assignments.component.scss"],
})
export class AssignmentsComponent implements OnInit {
  public uuid: UUID;
  public isTeacher: boolean = false;
  public currentUser: any;
  public memberships: any = [];
  public classroom: any;
  public assignmentUsers: any[] = [];
  public loadingState: boolean = true;
  public assignemtName: string;

  public assignmentPageLength = 0;
  public assignmentPageSize = 10;
  public submittedChart: any;
  public succseededChart: any;

  constructor(
    private educationService: EducationService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.uuid = params.id;
    });
  }

  async ngOnInit() {
    await this.showPage();

    // Your data and options for the pie chart go here

    // Create the pie chart
    this.submittedChart = new Chart("submittedChart", {
      type: "pie",
      data: {
        labels: [
          "Submitted",
          "Test complete",
          "Graded",
          "Not submitted",
          "Not tested",
          "Not graded",
        ],
        datasets: [
          {
            data: [
              this.assignmentUsers.filter((aU) => aU.published).length,
              0,
              0,
              this.assignmentUsers.filter((aU) => !aU.published).length,
              0,
              0,
            ],
            backgroundColor: [
              "green",
              "green",
              "green",
              "lightgrey",
              "lightgrey",
              "lightgrey",
            ],
          },
          {
            data: [
              0,
              this.assignmentUsers.filter((aU) => aU.test).length,
              0,
              0,
              this.assignmentUsers.filter((aU) => !aU.test).length,
              0,
            ],
            backgroundColor: [
              "green",
              "green",
              "green",
              "lightgrey",
              "lightgrey",
              "lightgrey",
            ],
          },
          {
            data: [
              0,
              0,
              this.assignmentUsers.filter((aU) => aU.graded).length,
              0,
              0,
              this.assignmentUsers.filter((aU) => !aU.graded).length,
            ],
            backgroundColor: [
              "green",
              "green",
              "green",
              "lightgrey",
              "lightgrey",
              "lightgrey",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Submitted",
            padding: 20,
            color: "black",
            font: {
              size: 22,
            },
          },
        },
      },
    });
  }

  public async showPage() {
    this.currentUser = this.authenticationService.currentUser;
    await this.educationService
      .getAssignmentUsers(this.uuid)
      .toPromise()
      .then(async (res: assignmentUser[]) => {
        if (res) {
          this.classroom = res[0].assignment.classroom;
          this.assignemtName = res[0].assignment.name;
          this.assignmentUsers = res;
        }
        await this.educationService
          .getOwnerClassrooms(this.currentUser.username)
          .toPromise()
          .then((res1: any) => {
            this.memberships = res1.content;
            if (this.memberships.length <= 0) {
              this.isTeacher = false;
            }
            for (let classroomMembership of this.memberships) {
              if (classroomMembership.uuid == this.classroom.uuid) {
                this.isTeacher = true;
              }
            }
            this.loadingState = false;
          });
      });
  }

  backToClassroom() {
    this.router.navigate([
      "/classrooms",
      this.assignmentUsers[0].assignment.classroom.uuid,
    ]);
  }
}
