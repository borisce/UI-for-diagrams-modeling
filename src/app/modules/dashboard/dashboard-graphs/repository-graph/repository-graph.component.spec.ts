import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepositoryGraphComponent } from './repository-graph.component';

describe('RepositoryGraphComponent', () => {
  let component: RepositoryGraphComponent;
  let fixture: ComponentFixture<RepositoryGraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
