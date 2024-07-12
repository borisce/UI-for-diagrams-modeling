import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynthesisTerminalComponent } from './synthesis-terminal.component';

describe('SynthesisTerminalComponent', () => {
  let component: SynthesisTerminalComponent;
  let fixture: ComponentFixture<SynthesisTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SynthesisTerminalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynthesisTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
