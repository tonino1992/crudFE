import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangageExamsComponent } from './mangage-exams.component';

describe('MangageExamsComponent', () => {
  let component: MangageExamsComponent;
  let fixture: ComponentFixture<MangageExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangageExamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangageExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
