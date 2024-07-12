import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectExistingSimulationComponent } from './modal-select-existing-simulation.component';

describe('ModalSelectExistingSimulationComponent', () => {
  let component: ModalSelectExistingSimulationComponent;
  let fixture: ComponentFixture<ModalSelectExistingSimulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSelectExistingSimulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectExistingSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
