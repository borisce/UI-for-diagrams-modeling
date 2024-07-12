import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubdiagramPaperComponent } from './subdiagram-paper-component.component';

describe('SubdiagramPaperComponent', () => {
  let component: SubdiagramPaperComponent;
  let fixture: ComponentFixture<SubdiagramPaperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdiagramPaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdiagramPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
