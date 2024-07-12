import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MyCoreListingComponent} from './listing.component';

describe('MyCoreListingComponent', () => {
  let component: MyCoreListingComponent;
  let fixture: ComponentFixture<MyCoreListingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MyCoreListingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCoreListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
