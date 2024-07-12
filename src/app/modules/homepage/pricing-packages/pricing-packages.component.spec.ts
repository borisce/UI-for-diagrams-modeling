import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PricingPackagesComponent } from './pricing-packages.component';

describe('LandingComponent', () => {
  let component: PricingPackagesComponent;
  let fixture: ComponentFixture<PricingPackagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
