import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RepositoryEditationComponent } from './repository-editation.component';

describe('RepositoryEditationComponent', () => {
  let component: RepositoryEditationComponent;
  let fixture: ComponentFixture<RepositoryEditationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryEditationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryEditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
