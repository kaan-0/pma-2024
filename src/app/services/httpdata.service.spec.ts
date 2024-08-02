import { TestBed } from '@angular/core/testing';

import { HttpdataService } from './httpdata.service';

describe('HttpdataService', () => {
  let service: HttpdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
