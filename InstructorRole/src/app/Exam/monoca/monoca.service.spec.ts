import { TestBed } from '@angular/core/testing';

import { MonocaService } from './monoca.service';

describe('MonocaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonocaService = TestBed.get(MonocaService);
    expect(service).toBeTruthy();
  });
});
