import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteExamComponent } from './vote-exam.component';

describe('VoteExamComponent', () => {
  let component: VoteExamComponent;
  let fixture: ComponentFixture<VoteExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
