import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalManageExistingSimulationComponent} from './modal-manage-existing-simulation.component';

describe('ModalManageExistingSimulationComponent', () => {
  let component: ModalManageExistingSimulationComponent;
  let fixture: ComponentFixture<ModalManageExistingSimulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalManageExistingSimulationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalManageExistingSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
