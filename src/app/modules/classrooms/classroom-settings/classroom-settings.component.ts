import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../core/service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ModalAddTeachersComponent } from '../../../modal/modal-add_teachers/modal-add-teachers.component';
import { ModalConfirmSettingsActionComponent } from '../../../modal/modal-confirm-settings-action/modal-confirm-settings-action.component';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { EducationService } from 'src/app/core/service/education.service';
import { ModalClassroomChangepwdComponent } from 'src/app/modal/modal-classroom-changepwd/modal-classroom-changepwd.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-classroom-settings',
  templateUrl: './classroom-settings.component.html',
  styleUrls: ['./classroom-settings.component.scss']
})
export class ClassroomSettingsComponent implements OnInit {
  public currentUser: any;
  public loadingState: boolean = true;
  public id: string;
  public loading: boolean = false;

  public slugState = "edit";
  public nameState = "edit";

  @ViewChild('classnameInput') classnameInput: MatInput;
  @ViewChild('slugInput') slugInput: MatInput;
  @ViewChild('editNameButton') editNameButton: HTMLButtonElement;
  @ViewChild('editSlugButton') editSlugButton: HTMLButtonElement;

  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private educationService: EducationService,
    private dialogRef: MatDialogRef<ClassroomSettingsComponent>,
    private snackBar: MatSnackBar
  ) {
    // this.authenticationService.currentUser.subscribe(
    //   (x) => {
    //     this.currentUser = x;
    //   }
    // );
    this.route.params.subscribe(params => this.id = params.id);
  }

  public ngOnInit(): void {
    this.loadingState = false;
  }

  public openAddTeachersDialog(): void {
    this.dialog.open(ModalAddTeachersComponent, {
      width: '600px',
      data: {}
    });
  }

  public openDialog(header: string, body: string): any {
    return this.dialog.open(ModalConfirmSettingsActionComponent, {
      width: '600px',
      data: { header, body }
    });
  }

  public async lockClassroom() {
    const response = await this.educationService.lockClassroom(this.data.uuid).subscribe(result => {
      this.snackBar.open("Classroom has been locked", null, {
        duration: 5000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom'
      });
      this.dialogRef.close();
    }, error => {
      this.snackBar.open(error, null, {
        duration: 5000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom'
      });
    });
  }

  public updateClassroomDetails(): void {
  }

  public async editClassroomName() {
    if (this.nameState == "edit") {
      this.classnameInput.disabled = false;
      this.slugInput.focus();

      this.nameState = "check";
    } else {
      this.classnameInput.disabled = true;

      const classname = this.classnameInput.value;
      const slug = this.slugInput.value;
      if (classname.length > 0) {
        const response = await this.educationService.updateClassroom(this.data.uuid, classname, slug, this.data.password).subscribe((r) => {
          this.dialogRef.close(true);
        }, error => {
          console.error(error);
        })
      }

      this.nameState = "edit";
    }

  }

  public async editClassroomSlug() {
    if (this.slugState == "edit") {
      this.slugInput.disabled = false;
      this.slugInput.focus();

      this.slugState = "check";
    } else {
      this.slugInput.disabled = true;

      const classname = this.classnameInput.value;
      const slug = this.slugInput.value;
      if (slug.length > 0) {
        const response = await this.educationService.updateClassroom(this.data.uuid, classname, slug, this.data.password).subscribe((r) => {
          this.dialogRef.close(true);
        }, error => {
          console.error(error);
        })
      }

      this.slugState = "edit";
    }
  }

  public changePassword() {
    const dialogRef = this.dialog.open(ModalClassroomChangepwdComponent, {
      width: 'auto',
      data: this.data
    });

    dialogRef.afterClosed().subscribe((r) => {
      if (r == true) {
        this.snackBar.open("Password has been changed", null, {
          duration: 5000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom'
        });
      } else {
        this.snackBar.open(r, null, {
          duration: 5000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom'
        });
      }
      this.dialogRef.close();
    })
  }

  public shareClassroom() {

  }
}
