import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MyCoreVersionsComponent} from './detail.component';

describe('MyCoreDetailComponent', () => {
  let component: MyCoreVersionsComponent;
  let fixture: ComponentFixture<MyCoreVersionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MyCoreVersionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCoreVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
