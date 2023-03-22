import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExamsStudentComponent } from './my-exams-student.component';

describe('MyExamsStudentComponent', () => {
  let component: MyExamsStudentComponent;
  let fixture: ComponentFixture<MyExamsStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyExamsStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyExamsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
