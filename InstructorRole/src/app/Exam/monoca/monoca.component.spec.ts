import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonocaComponent } from './monoca.component';

describe('MonocaComponent', () => {
  let component: MonocaComponent;
  let fixture: ComponentFixture<MonocaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonocaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
