import { TestBed } from '@angular/core/testing';

import { JumpToDefinitionService } from './jump-to-definition.service';

describe('JumpToDefinitionService', () => {
  let service: JumpToDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JumpToDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
