import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-change-assignment',
  templateUrl: './modal-change-assignment.component.html',
  styleUrls: ['./modal-change-assignment.component.scss']
})
export class ModalChangeAssignmentComponent implements OnInit {
  @Input() public assingment: any;

  public createAssignment: UntypedFormGroup;
  public submitted: boolean = false;
  public name: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ModalChangeAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { assignment: any }
  ) {
  }

  get f(): any {
    return this.createAssignment.controls;
  }

  public ngOnInit(): any {
    this.createAssignment = this.formBuilder.group({
      name: ['', Validators.required],
      uri: ['', Validators.required],
      due_date: ['', Validators.required]
    });
  }

  public onSubmit(): any {
    this.submitted = true;
    if (this.createAssignment.invalid) {
      return;
    }
    this.dialogRef.close(this.f.title.value);
  }
}
