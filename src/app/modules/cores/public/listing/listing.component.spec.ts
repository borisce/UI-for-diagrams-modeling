import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoreListingComponent } from './listing.component';

describe('CoreListingComponent', () => {
  let component: CoreListingComponent;
  let fixture: ComponentFixture<CoreListingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
