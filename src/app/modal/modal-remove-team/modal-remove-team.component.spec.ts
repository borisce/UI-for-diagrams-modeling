import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalRemoveTeamComponent } from './modal-remove-team.component';

describe('ModalRemoveTeamComponent', () => {
  let component: ModalRemoveTeamComponent;
  let fixture: ComponentFixture<ModalRemoveTeamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRemoveTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRemoveTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
