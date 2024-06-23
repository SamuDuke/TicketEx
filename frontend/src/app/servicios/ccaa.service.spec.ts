import { TestBed } from '@angular/core/testing';

import { CcaaService } from './ccaa.service';

describe('CcaaService', () => {
  let service: CcaaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CcaaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
