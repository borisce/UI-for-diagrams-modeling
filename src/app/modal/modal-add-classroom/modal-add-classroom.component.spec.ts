import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalAddClassroomComponent } from './modal-add-classroom.component';

describe('ModalNewBranchComponent', () => {
  let component: ModalAddClassroomComponent;
  let fixture: ComponentFixture<ModalAddClassroomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAddClassroomComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
