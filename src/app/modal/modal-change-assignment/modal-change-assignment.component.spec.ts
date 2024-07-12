import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalChangeAssignmentComponent } from './modal-change-assignment.component';

describe('ModalNewBranchComponent', () => {
  let component: ModalChangeAssignmentComponent;
  let fixture: ComponentFixture<ModalChangeAssignmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalChangeAssignmentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangeAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
