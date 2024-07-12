import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrgReposComponent } from './org-repos.component';

describe('OrgReposComponent', () => {
  let component: OrgReposComponent;
  let fixture: ComponentFixture<OrgReposComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgReposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
