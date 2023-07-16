import { TestBed } from '@angular/core/testing';

import { HashListService } from './hash-list.service';

describe('HashListService', () => {
  let service: HashListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
