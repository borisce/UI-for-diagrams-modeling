import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrgTeamsComponent } from './org-teams.component';

describe('OrgTeamsComponent', () => {
  let component: OrgTeamsComponent;
  let fixture: ComponentFixture<OrgTeamsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
