import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalDialogWindowsComponent } from './modal-dialog-windows.component';

describe('ModalDialogWindowsComponent', () => {
  let component: ModalDialogWindowsComponent;
  let fixture: ComponentFixture<ModalDialogWindowsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDialogWindowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
