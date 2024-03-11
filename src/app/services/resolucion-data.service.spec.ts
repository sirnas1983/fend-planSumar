import { TestBed } from '@angular/core/testing';

import { ResolucionDataService } from './resolucion-data.service';

describe('ResolucionDataService', () => {
  let service: ResolucionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolucionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
