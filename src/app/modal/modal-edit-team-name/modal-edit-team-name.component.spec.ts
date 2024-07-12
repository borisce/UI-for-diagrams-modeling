import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalEditTeamNameComponent } from './modal-edit-team-name.component';

describe('ModalEditTeamNameComponent', () => {
  let component: ModalEditTeamNameComponent;
  let fixture: ComponentFixture<ModalEditTeamNameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditTeamNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditTeamNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
