import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-invite-students',
  templateUrl: './modal-invite-students.component.html',
  styleUrls: ['./modal-invite-students.component.scss']
})
export class ModalInviteStudentsComponent implements OnInit {

  public inviteStudents: UntypedFormGroup;
  public submitted: boolean = false;
  public name: string;
  public studentsToInvite: Array<string> = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ModalInviteStudentsComponent>
  ) {
  }

  get f(): any {
    return this.inviteStudents.controls;
  }

  public ngOnInit(): any {
    this.inviteStudents = this.formBuilder.group({
      newStudent: ['', Validators.required]
    });
  }

  public onSubmit(): any {
    this.submitted = true;
    if (this.inviteStudents.invalid) {
      return;
    }
    this.dialogRef.close(this.f.newStudent.value);
  }

  public addStudent(): void {
    if (!this.inviteStudents.invalid) {
      this.studentsToInvite.push(this.f.newStudent.value);
    }
  }

  public removeStudent(student: string): void {
    const index: number = this.studentsToInvite.indexOf(student, 0);
    if (index > -1) {
      this.studentsToInvite.splice(index, 1);
    }
  }
}
