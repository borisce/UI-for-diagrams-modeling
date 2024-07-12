import { TestBed } from '@angular/core/testing';

import { SearchWordsAroundService } from './search-words-around.service';

describe('SearchWordsAroundService', () => {
  let service: SearchWordsAroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchWordsAroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
