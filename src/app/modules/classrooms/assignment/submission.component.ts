import { Component, Inject, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../core/service";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { EducationService } from "src/app/core/service/education.service";
import { Router } from "@angular/router";
import { RepositoryService } from "src/app/core/service/repository.service";
import { CommonModule } from "@angular/common";
import { Repository } from "src/app/api/models/repository";
import { SimulationConfiguration } from "src/app/api/models/simulation-configuration";

@Component({
  selector: "app-submission",
  templateUrl: "./submission.component.html",
  styleUrls: ["./submission.component.scss"],
})
export class SubmissionComponent implements OnInit {
  public configureAssignment: UntypedFormGroup;
  public loadingState: boolean = true;
  public assignment: any;
  public assignmentUser: any;
  public published: boolean;
  public dueDateTime: String;
  public currentUser: any;
  public isTeacher: boolean = false;
  public memberships: any = [];
  public repository: Repository;
  public total: number;
  public points: any;
  public simulationConfigurations: SimulationConfiguration[] = [];
  pdfSrc: any;
  documentationFile: File;

  constructor(
    private authenticationService: AuthenticationService,
    private dialogRef: MatDialogRef<SubmissionComponent>,
    private educationService: EducationService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private repositoryService: RepositoryService,
    @Inject(MAT_DIALOG_DATA) private assignmentData
  ) {
    this.assignmentUser = assignmentData;
    this.assignment = assignmentData.assignment;
    this.published = this.assignment.published;
  }

  public async ngOnInit() {
    let actualDate = new Date(this.assignment.dueDate);
    this.dueDateTime = actualDate.toISOString().substring(0, 16);

    this.configureAssignment = this.formBuilder.group({
      description: [
        {
          value: this.assignmentUser.description
            ? this.assignmentUser.description
            : "",
          disabled: this.isOverdue(),
        },
      ],
    });

    this.createPointsObject();
    this.getAuth();
    this.getDescriptionPDF();
    await this.getSimulationConfiguration();
  }

  getSimulationConfiguration() {
    this.repositoryService.currentRepo = this.assignmentUser.repository;
    this.repositoryService
      .getRepositorySimulationConfiguration()
      .toPromise()
      .then((res: SimulationConfiguration[]) => {
        this.simulationConfigurations = res.filter(
          (conf) => conf.simulationTestNumber != null
        );
      })
      .catch((er) => console.log(er));
  }

  getTestOutput() {
    return this.simulationConfigurations.find(
      (conf) => conf.simulationTestNumber == "TEST_1"
    ).test_output;
  }

  public async getAuth() {
    this.currentUser = this.authenticationService.currentUser;
    this.educationService
      .getOwnerClassrooms(this.currentUser.username)
      .toPromise()
      .then((res: any) => {
        this.memberships = res.content;
        if (this.memberships.length <= 0) {
          this.isTeacher = false;
        }
        for (let classroomMembership of this.memberships) {
          if (classroomMembership.uuid == this.assignment.classroom.uuid) {
            this.isTeacher = true;
          }
        }
      });
  }

  public onSubmit() {
    if (this.configureAssignment.valid) {
      const file = new FormData();
      file.append("file", this.documentationFile);
      this.educationService
        .createAssignmentDescription(
          this.assignment.classroom.uuid,
          file,
          this.assignment.uuid
        )
        .subscribe(
          () => {
            this.dialogRef.close(true);
          },
          (error1) => {}
        );
    }
  }

  isOverdue() {
    return new Date(this.assignment.dueDate) < new Date();
  }

  private createPointsObject() {
    if (this.assignmentUser.graded) {
      this.points = {
        descriptionPoints:
          this.assignmentUser.descriptionPoints +
          "/" +
          this.assignment.descriptionPoints,
        simulationPoints:
          this.assignmentUser.simulationPoints +
          "/" +
          this.assignment.simulationPoints,
        codePoints:
          this.assignmentUser.codePoints + "/" + this.assignment.codePoints,

        total:
          this.assignmentUser.descriptionPoints +
          this.assignmentUser.simulationPoints +
          this.assignmentUser.codePoints +
          "/" +
          (this.assignment.descriptionPoints +
            this.assignment.simulationPoints +
            this.assignment.codePoints),
      };
    } else {
      this.points = {
        descriptionPoints: this.assignment.descriptionPoints,
        simulationPoints: this.assignment.simulationPoints,
        codePoints: this.assignment.codePoints,
        total:
          this.assignment.descriptionPoints +
          this.assignment.simulationPoints +
          this.assignment.codePoints,
      };
    }
  }

  async getDescriptionPDF() {
    await this.educationService
      .getAssignmentDescription(this.assignment.uuid)
      .subscribe((file: any) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.pdfSrc = new Uint8Array(fileReader.result as ArrayBuffer);
        };
        fileReader.readAsArrayBuffer(file);
        this.loadingState = false;
      });
  }

  public onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]; // Here we use only the first file (single file)
    if (file.type.includes("pdf")) {
      this.documentationFile = file;
      this.configureAssignment.patchValue({ description: file.name });
    }
  }
}
