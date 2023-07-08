import { TestBed } from '@angular/core/testing';

import { IbmidService } from './ibmid.service';

describe('IbmidService', () => {
  let service: IbmidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IbmidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
