import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalNewBranchComponent } from './modal-new-branch.component';

describe('ModalNewBranchComponent', () => {
  let component: ModalNewBranchComponent;
  let fixture: ComponentFixture<ModalNewBranchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
