import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoreDetailComponent } from './detail.component';

describe('CoreDetailComponent', () => {
  let component: CoreDetailComponent;
  let fixture: ComponentFixture<CoreDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
