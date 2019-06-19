import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAvailableExamComponent } from './student-available-exam.component';

describe('StudentAvailableExamComponent', () => {
  let component: StudentAvailableExamComponent;
  let fixture: ComponentFixture<StudentAvailableExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAvailableExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAvailableExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
