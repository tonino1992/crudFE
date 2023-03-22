import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtObject } from 'src/app/classes/jwtObject';
import { StudentExamDto } from 'src/app/classes/studentExamDto';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { StudentExamService } from 'src/app/services/student-exam/student-exam.service';

@Component({
  selector: 'app-exam-results',
  templateUrl: './exam-results.component.html',
  styleUrls: ['./exam-results.component.scss']
})
export class ExamResultsComponent implements OnInit {

  jwt: JwtObject;
  exams: StudentExamDto[] = [];

  constructor(private jwtService: JwtService, private studentExamService: StudentExamService) { }

  ngOnInit(): void {
    this.jwt = this.jwtService.decodeJwt();
    this.loadExams()
  }

  loadExams() {
    this.studentExamService.getDoneExamsByStudent(this.jwt.id).subscribe({
      next: (exams) => {
        this.exams = exams;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Student not found');
        } else if (err.status === 500) {
          alert('Internal server error');
        }
      }
    });
  }

  result(vote: number): string {
    if (vote === 0) {
      return 'In attesa'
    } else if (vote < 18) {
      return 'Bocciato'
    } else {
      return 'Promosso'
    }
  }

}
