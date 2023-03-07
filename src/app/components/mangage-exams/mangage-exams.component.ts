import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ExamJoinCourseDto } from 'src/app/classes/examJoinCourseDto';
import { ExamService } from 'src/app/services/exam/exam.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mangage-exams',
  templateUrl: './mangage-exams.component.html',
  styleUrls: ['./mangage-exams.component.scss']
})
export class ManageExamsComponent {

  examId: number;
  exam: ExamJoinCourseDto;

  constructor(private examService: ExamService, public dialogRef: MatDialogRef<ManageExamsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.examId = data.examId;
  }

  ngOnInit() {
    this.loadExamById(this.examId);    
  }

  loadExamById(id: number) {
    this.examService.getExamById(id).subscribe({
      next: (e) => {
        this.exam = e;        
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          alert('Esame non trovato')
        } else {
          alert('Internal server error')
        }
      }
    })
  }

}
