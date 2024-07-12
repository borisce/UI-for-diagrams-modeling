import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CollaboratorsListComponent } from './collaborators-list.component';

describe('CollaboratorsListComponent', () => {
  let component: CollaboratorsListComponent;
  let fixture: ComponentFixture<CollaboratorsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
