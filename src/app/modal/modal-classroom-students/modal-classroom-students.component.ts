import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-modal-classroom-students",
  templateUrl: "./modal-classroom-students.component.html",
  styleUrls: ["./modal-classroom-students.component.scss"],
})
export class ModalClassroomStudentsComponent implements OnInit {
  students = [];
  teachers = [];

  constructor(
    public dialogRef: MatDialogRef<ModalClassroomStudentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.students = this.data.students;
    this.teachers = this.data.teachers;
  }
}
