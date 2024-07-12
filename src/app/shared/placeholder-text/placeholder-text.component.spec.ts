import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderText } from './placeholder-text.component';

describe('PlaceholderText', () => {
  let component: PlaceholderText;
  let fixture: ComponentFixture<PlaceholderText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaceholderText]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
