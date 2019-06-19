import { TestBed } from '@angular/core/testing';

import { StudentCoursesService } from './student-courses.service';

describe('StudentCoursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentCoursesService = TestBed.get(StudentCoursesService);
    expect(service).toBeTruthy();
  });
});
