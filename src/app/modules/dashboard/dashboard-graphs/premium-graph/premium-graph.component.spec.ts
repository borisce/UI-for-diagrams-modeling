import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PremiumGraphComponent } from './premium-graph.component';

describe('PremiumGraphComponent', () => {
  let component: PremiumGraphComponent;
  let fixture: ComponentFixture<PremiumGraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
