import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EducationService } from 'src/app/core/service/education.service';
import { passwordValidator } from './password.validator';

@Component({
  selector: 'app-modal-classroom-changepwd',
  templateUrl: './modal-classroom-changepwd.component.html',
  styleUrls: ['./modal-classroom-changepwd.component.scss']
})
export class ModalClassroomChangepwdComponent implements OnInit {
  public passwordForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<ModalClassroomChangepwdComponent>,
    private educationService: EducationService,
    @Inject(MAT_DIALOG_DATA) private classroom) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
    })
  }

  public onSubmit() {
    this.updatePassword(this.classroom);
    this.dialogRef.close(true);
  }

  private async updatePassword(classroom: any) {
    const response = await this.educationService.updateClassroom(classroom.uuid, classroom.name, classroom.slug, this.passwordForm.controls.newPassword.value).subscribe(response => {
      this.dialogRef.close(true);
    }, error => this.dialogRef.close(error));
  }
}
