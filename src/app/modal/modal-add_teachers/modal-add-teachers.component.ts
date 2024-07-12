import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-add-teachers',
  templateUrl: './modal-add-teachers.component.html',
  styleUrls: ['./modal-add-teachers.component.scss']
})
export class ModalAddTeachersComponent implements OnInit {

  public addTeachers: UntypedFormGroup;
  public submitted: boolean = false;
  public name: string;
  public teachersToAdd: Array<string> = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ModalAddTeachersComponent>
  ) {
  }

  get f(): any {
    return this.addTeachers.controls;
  }

  public ngOnInit(): any {
    this.addTeachers = this.formBuilder.group({
      newTeacher: ['', Validators.required]
    });
  }

  public onSubmit(): any {
    this.submitted = true;
    if (this.addTeachers.invalid) {
      return;
    }
    this.dialogRef.close(this.f.newTeacher.value);
  }

  public addTeacher(): void {
    if (!this.addTeachers.invalid) {
      this.teachersToAdd.push(this.f.newTeacher.value);
    }
  }

  public removeTeacher(teacher: string): void {
    const index: number = this.teachersToAdd.indexOf(teacher, 0);
    if (index > -1) {
      this.teachersToAdd.splice(index, 1);
    }
  }
}
