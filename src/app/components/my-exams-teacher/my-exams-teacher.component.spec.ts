import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExamsTeacherComponent } from './my-exams-teacher.component';

describe('MyExamsTeacherComponent', () => {
  let component: MyExamsTeacherComponent;
  let fixture: ComponentFixture<MyExamsTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyExamsTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyExamsTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
