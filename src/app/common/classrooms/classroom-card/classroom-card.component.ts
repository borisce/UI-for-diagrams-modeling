import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalConfirmComponent } from '../../../modal/modal-confirm/modal-confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-classroom-card',
  templateUrl: './classroom-card.component.html',
  styleUrls: ['./classroom-card.component.scss'],
})
export class ClassroomCardComponent implements OnInit {
  @Input() public classroom: any;

  @Output() onClassroomSelected = new EventEmitter<any>();
  @Output() onClassroomDeleted = new EventEmitter<any>();
  @Output() onClassroomSettings = new EventEmitter<any>();

  /**
   * Event emitter when classroom selected
   */
  public classroomSelected() {
    this.onClassroomSelected.emit(this.classroom);
  }

  /**
   * Event emitter when classroom deleted
   */
  public selectedClassroom() {
  }
  /**
   * Event emitter when classroom deleted
   */
  public classroomDeleted() {
    this.onClassroomDeleted.emit(this.classroom);
  }

  /**
   * Event emitter when classroom settings selected
   */
  public classroomSettingsSelected() {
    this.onClassroomSettings.emit(this.classroom);
  }

  constructor(
    private dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
  }

  public confirmClassroomRemove(classroom: any): void {
    this.dialog.open(ModalConfirmComponent,
      {
        data:
          {message: `Are you sure you want to delete classroom "${classroom.name}"?`}
      })
      .afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

}
