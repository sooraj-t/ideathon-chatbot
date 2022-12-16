import { TestBed } from '@angular/core/testing';

import { LuisaiService } from './luisai.service';

describe('LuisaiService', () => {
  let service: LuisaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuisaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
