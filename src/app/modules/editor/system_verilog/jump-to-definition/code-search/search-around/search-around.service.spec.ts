import { TestBed } from '@angular/core/testing';

import { SearchAroundService } from './search-around.service';

describe('SearchAroundService', () => {
  let service: SearchAroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchAroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
