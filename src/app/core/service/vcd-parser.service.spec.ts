import { TestBed } from '@angular/core/testing';

import { VcdParserService } from './vcd-parser.service';

describe('VcdParserService', () => {
  let service: VcdParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcdParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
