import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'lodash';
import { EducationService } from 'src/app/core/service/education.service';

@Component({
  selector: 'app-modal-add-classroom',
  templateUrl: './modal-add-classroom.component.html',
  styleUrls: ['./modal-add-classroom.component.scss']
})
export class ModalAddClassroomComponent implements OnInit {

  public addClassroom: UntypedFormGroup;
  public submitted: boolean = false;
  public name: string;
  public studentsToInvite: Array<string> = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ModalAddClassroomComponent>,
    private educationService: EducationService
  ) {
  }

  get f(): any {
    return this.addClassroom.controls;
  }

  public ngOnInit(): any {
    this.addClassroom = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      slug: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  public async onSubmit() {
    this.submitted = true;
    if (this.addClassroom.valid) {
      this.educationService.createNewClassroom(this.addClassroom.value).subscribe();
      this.dialogRef.close(true);
    }
  }
}
