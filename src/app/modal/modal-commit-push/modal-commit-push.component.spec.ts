import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalCommitPushComponent } from './modal-commit-push.component';

describe('ModalCommitPushComponent', () => {
  let component: ModalCommitPushComponent;
  let fixture: ComponentFixture<ModalCommitPushComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCommitPushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCommitPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
