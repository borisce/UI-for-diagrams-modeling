import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/api/models/user';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss'],
})
export class StudentCardComponent {
  @Input() public student: User;
  @Input() public isTeacher: boolean;
  @Output() onDeleteStudent = new EventEmitter<User>();

  public confirmStudentsRemove(student: User): void {
    this.onDeleteStudent.emit(student);
  }
}
