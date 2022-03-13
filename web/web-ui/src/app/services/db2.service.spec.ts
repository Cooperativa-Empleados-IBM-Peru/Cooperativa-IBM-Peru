import { TestBed } from '@angular/core/testing';

import { Db2Service } from './db2.service';

describe('Db2Service', () => {
  let service: Db2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Db2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
