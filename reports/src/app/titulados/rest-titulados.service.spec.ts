import { TestBed } from '@angular/core/testing';

import { RestTituladosService } from './rest-titulados.service';

describe('RestTituladosService', () => {
  let service: RestTituladosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestTituladosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
