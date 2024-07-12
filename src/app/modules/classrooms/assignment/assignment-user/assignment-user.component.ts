import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { ActivatedRoute, Router } from "@angular/router";
import { UUID } from "antlr4ts/misc";
import { Repository } from "src/app/api/models/repository";
import { AuthenticationService } from "src/app/core/service";
import { EducationService } from "src/app/core/service/education.service";
import { RepositoryService } from "src/app/core/service/repository.service";
import { EditorTabsService } from "src/app/modules/editor/editor-component/editor-tabs/service/editor-tabs.service";

type assignmentUser = {
  id: any;
  assignment: any;
  author: any;
  created: any;
  createdBy: any;
  lastAccountEdit: any;
  lastModified: any;
  lastModifiedBy: any;
  published: any;
  submitDate: any;
  uuid: any;
  description: string;
  repository: Repository;
  descriptionPoints: any;
  codePoints: any;
  synthesisPoints: any;
  simulationPoints: any;
  graded: boolean;
};

@Component({
  selector: "app-assignment-user",
  templateUrl: "./assignment-user.component.html",
  styleUrls: ["./assignment-user.component.scss"],
})
export class AssignmentUserComponent implements OnInit {
  public uuid: UUID;
  public isTeacher: boolean = false;
  public currentUser: any;
  public memberships: any = [];
  public classroom: any;
  public assignment: any;
  public loadingState: boolean = true;
  public studentName: string;

  public total: 0;
  public pointsFrom: any;
  public maxPoints: any;
  public gotPoints: any;
  public loadRepos = false;

  folders: any[] = null;
  notes = [
    {
      name: "Vacation Itinerary",
      updated: new Date("2/20/16"),
    },
    {
      name: "Kitchen Remodel",
      updated: new Date("1/18/16"),
    },
  ];

  repository: Repository = {
    pipe: undefined,
    uuid: "",
    created: undefined,
    createdBy: "",
    lastModified: undefined,
    lastModifiedBy: "",
    name: "",
    author: "",
    fileName: "",
    favorite: false,
    archived: false,
    description: "",
    uri: "",
    id: 0,
    is_private: false,
    isPublic: false,
    authorUUID: "",
    organizationUUID: "",
  };
  assignmentUser: assignmentUser;
  simulationConfig: any;
  teacherPDFsrc: any;
  studentPDFsrc: any;
  fileText: string;
  showText: boolean;
  showVCD: boolean;

  constructor(
    private educationService: EducationService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private repositoryService: RepositoryService,
    private editorTabsService: EditorTabsService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.uuid = params.id;
    });
  }

  async ngOnInit() {
    this.currentUser = this.authenticationService.currentUser;

    await this.showPage();

    await this.repositoryService
      .getRepositorySimulationResults(this.repositoryService.currentRepoUuid)
      .toPromise()
      .then((data: any) => {
        this.folders = data.content;
      });

    this.simulationConfig = await this.repositoryService
      .getRepositorySimulationConfiguration()
      .toPromise();

    await this.checkCorrectTestOutput();
  }

  public async checkCorrectTestOutput() {
    for (let folderIdx = 0; folderIdx < this.folders.length; folderIdx++) {
      let files = this.folders[folderIdx].files;
      for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
        if (files[fileIdx].file_name.endsWith(".txt")) {
          const fileContent: any = await this.repositoryService
            .getRepositorySimulationFile(
              this.repositoryService.currentRepoUuid,
              this.folders[folderIdx].uuid,
              files[fileIdx].uuid
            )
            .toPromise();
          if (fileContent.includes(this.simulationConfig.test_output)) {
            this.folders[folderIdx]["success"] = true;
          } else {
            this.folders[folderIdx]["success"] = false;
          }
        }
      }
    }
  }

  public async showPage() {
    await this.educationService
      .getAssignmentDetails(this.uuid)
      .toPromise()
      .then(async (assignmentUser: assignmentUser) => {
        this.setVariables(assignmentUser);
        this.createPointsObject();
        await this.educationService
          .getOwnerClassrooms(this.currentUser.username)
          .toPromise()
          .then((ownerClassroom: any) => {
            this.memberships = ownerClassroom.content;
            if (this.memberships.length <= 0) {
              this.isTeacher = false;
            }
            for (let classroomMembership of this.memberships) {
              if (classroomMembership.uuid == this.classroom.uuid) {
                this.isTeacher = true;
              }
            }
          });

        await this.educationService
          .getAssignmentDescription(assignmentUser.assignment.uuid)
          .toPromise()
          .then((file: any) => {

            const fileReader = new FileReader();
            fileReader.onload = () => {
              this.teacherPDFsrc = new Uint8Array(
                fileReader.result as ArrayBuffer
              );
            };
            fileReader.readAsArrayBuffer(file);
          });

        await this.educationService
          .getAssignmentDescription(
            assignmentUser.assignment.uuid,
            assignmentUser.uuid
          )
          .toPromise()
          .then((file: any) => {

            const fileReader = new FileReader();
            fileReader.onload = () => {
              this.studentPDFsrc = new Uint8Array(
                fileReader.result as ArrayBuffer
              );
            };
            fileReader.readAsArrayBuffer(file);
          })
          .catch((error: any) => {
            console.log(error);
          });
        this.loadingState = false;
      });
  }

  async chooseFile(filename: string, simulation, fileUuid: string) {
    const fileContent: any = await this.repositoryService
      .getRepositorySimulationFile(
        this.repositoryService.currentRepoUuid,
        simulation.uuid,
        fileUuid
      )
      .toPromise();
    if (filename.endsWith(".vcd")) {
      this.showVCD = true;
      this.showText = false;
      this.loadRepos = false;
      this.editorTabsService.openVCD(fileContent);
    } else {
      this.showVCD = false;
      this.showText = true;
      this.fileText = fileContent;
    }
  }

  getPointsForm(pointsFrom) {
    this.pointsFrom = pointsFrom;
  }

  createPointsObject() {
    this.gotPoints = {
      description: this.assignmentUser.descriptionPoints,
      simulation: this.assignmentUser.simulationPoints,
      synthesis: this.assignmentUser.synthesisPoints,
      code: this.assignmentUser.codePoints,
    };

    this.maxPoints = {
      description: this.assignment.descriptionPoints,
      simulation: this.assignment.simulationPoints,
      synthesis: this.assignment.synthesisPoints,
      code: this.assignment.codePoints,
    };
  }

  updatePoints() {
    if (this.pointsFrom) {
      this.educationService
        .updateAssignmentUser(this.uuid, this.pointsFrom)
        .toPromise()
        .then((assignmentUser) => {
          this.setVariables(assignmentUser);
          this.createPointsObject();
        });
    }
  }

  setVariables(assignmentUser) {
    this.assignmentUser = assignmentUser;
    this.assignment = this.assignmentUser.assignment;
    this.classroom = this.assignment.classroom;
    this.studentName =
      assignmentUser.author.firstName + " " + assignmentUser.author.lastName;
    this.repository["uuid"] = assignmentUser.repository.uuid;
    this.repositoryService.currentRepo = assignmentUser.repository;
  }

  checkTestSuccessfull(testNumber) {
    for (let i = 0; i < this.folders.length; i++) {
      let simulation = this.folders[i];

      if (simulation.repo_simulation_configuration) {
        if (
          simulation.repo_simulation_configuration.simulationTestNumber ==
            testNumber &&
          simulation.test
        ) {
          return "green";
        }

        if (
          simulation.repo_simulation_configuration.simulationTestNumber ==
            testNumber &&
          !simulation.test
        ) {
          return "red";
        }
      } else {
        return "lightgrey";
      }
    }
    return "lightgrey";
  }

  onTabFocusChange(event: MatTabChangeEvent) {
    if (event.index == 1) {
      this.loadRepos = true;
    } else {
      this.loadRepos = false;
    }
  }

  backToClassroom() {
    this.router.navigate(["/classrooms", this.assignment.classroom.uuid]);
  }

  backToAssignment() {
    this.router.navigate(["/assignments", this.assignment.uuid]);
  }
}
