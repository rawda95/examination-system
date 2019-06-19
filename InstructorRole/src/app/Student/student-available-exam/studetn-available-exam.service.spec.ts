import { TestBed } from '@angular/core/testing';

import { StudetnAvailableExamService } from './studetn-available-exam.service';

describe('StudetnAvailableExamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudetnAvailableExamService = TestBed.get(StudetnAvailableExamService);
    expect(service).toBeTruthy();
  });
});
