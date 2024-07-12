import { TestBed } from '@angular/core/testing';

import { CodeIdentificationService } from './code-identification.service';

describe('CodeIdentificationService', () => {
  let service: CodeIdentificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeIdentificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
