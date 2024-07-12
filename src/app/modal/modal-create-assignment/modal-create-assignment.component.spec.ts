import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalCreateAssignmentComponent } from './modal-create-assignment.component';

describe('ModalNewBranchComponent', () => {
  let component: ModalCreateAssignmentComponent;
  let fixture: ComponentFixture<ModalCreateAssignmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCreateAssignmentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
