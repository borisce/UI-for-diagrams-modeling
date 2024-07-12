import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SystemVerilogCodeGeneratorComponent} from './systemverilog-code-generator.component';

describe('GenerateCodeComponent', () => {
  let component: SystemVerilogCodeGeneratorComponent;
  let fixture: ComponentFixture<SystemVerilogCodeGeneratorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SystemVerilogCodeGeneratorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemVerilogCodeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
