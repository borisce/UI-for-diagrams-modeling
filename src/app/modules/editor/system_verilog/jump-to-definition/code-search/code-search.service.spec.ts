import { TestBed } from '@angular/core/testing';

import { CodeSearchService } from './code-search.service';

describe('CodeSearchService', () => {
  let service: CodeSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
