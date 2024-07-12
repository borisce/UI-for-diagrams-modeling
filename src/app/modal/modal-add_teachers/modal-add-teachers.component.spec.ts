import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalAddTeachersComponent } from './modal-add-teachers.component';

describe('ModalNewBranchComponent', () => {
  let component: ModalAddTeachersComponent;
  let fixture: ComponentFixture<ModalAddTeachersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAddTeachersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
