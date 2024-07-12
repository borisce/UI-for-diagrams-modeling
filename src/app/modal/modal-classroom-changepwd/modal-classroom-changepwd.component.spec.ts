import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalClassroomChangepwdComponent } from './modal-classroom-changepwd.component';

describe('ModalClassroomChangepwdComponent', () => {
  let component: ModalClassroomChangepwdComponent;
  let fixture: ComponentFixture<ModalClassroomChangepwdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalClassroomChangepwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalClassroomChangepwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
