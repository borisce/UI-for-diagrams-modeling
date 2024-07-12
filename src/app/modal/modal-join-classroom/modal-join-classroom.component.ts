import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Repository } from "src/app/api/models/repository";
import { FilesService } from "src/app/core/fileSystem/Filer/files.service";
import { ZipService } from "src/app/core/fileSystem/ZipWorker/zip.service";
import { EducationService } from "src/app/core/service/education.service";
import { RepositoryService } from "src/app/core/service/repository.service";

@Component({
  selector: "app-modal-join-classroom",
  templateUrl: "./modal-join-classroom.component.html",
  styleUrls: ["./modal-join-classroom.component.scss"],
})
export class ModalJoinClassroomComponent implements OnInit {
  public joinClassroom: UntypedFormGroup;
  public submitted: boolean = false;
  public name: string;
  public studentsToInvite: Array<string> = [];
  zipTasks: any[];
  joinResponse: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ModalJoinClassroomComponent>,
    private educationService: EducationService,
    private snackbar: MatSnackBar
  ) {}

  get f(): any {
    return this.joinClassroom.controls;
  }

  public ngOnInit(): any {
    this.joinClassroom = this.formBuilder.group({
      slug: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  public async onSubmit() {
    if (this.joinClassroom.valid && !this.submitted) {
      this.submitted = true;
      this.joinResponse = await this.educationService
        .joinClassroom(this.f.slug.value, this.f.password.value)
        .subscribe(
          (x) => {
            this.dialogRef.close(true);
          },
          (error) => {
            this.snackbar.open(error, null, {
              duration: 5000,
              verticalPosition: "bottom",
              horizontalPosition: "left",
            });
            this.dialogRef.close(false);
          }
        );
    }
  }
}
