import { StateMachinesRoutingModule } from './statemachines-routing.module';

describe( 'StateMachinesRoutingModule', () => {
  let statemachinesroutingmodule: StateMachinesRoutingModule;

  beforeEach(() => {
    statemachinesroutingmodule = new StateMachinesRoutingModule();
  });

  it('should create an instance', () => {
    expect(StateMachinesRoutingModule).toBeTruthy();
  });
});
