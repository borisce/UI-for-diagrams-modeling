import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalJoinClassroomComponent } from './modal-join-classroom.component';

describe('ModalNewBranchComponent', () => {
  let component: ModalJoinClassroomComponent;
  let fixture: ComponentFixture<ModalJoinClassroomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalJoinClassroomComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalJoinClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
