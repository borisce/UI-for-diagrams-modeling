import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MyCoreUsagesComponent} from './usages.component';

describe('MyCoreUsagesComponent', () => {
  let component: MyCoreUsagesComponent;
  let fixture: ComponentFixture<MyCoreUsagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MyCoreUsagesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCoreUsagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
