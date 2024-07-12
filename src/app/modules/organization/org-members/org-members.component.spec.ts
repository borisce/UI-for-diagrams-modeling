import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrgMembersComponent } from './org-members.component';

describe('OrgMembersComponent', () => {
  let component: OrgMembersComponent;
  let fixture: ComponentFixture<OrgMembersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
