import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ExamJoinCourseDto } from 'src/app/classes/examJoinCourseDto';
import { JwtObject } from 'src/app/classes/jwtObject';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { StudentExamService } from 'src/app/services/student-exam/student-exam.service';

@Component({
  selector: 'app-my-exams-student',
  templateUrl: './my-exams-student.component.html',
  styleUrls: ['./my-exams-student.component.scss']
})
export class MyExamsStudentComponent implements OnInit{

  exams: ExamJoinCourseDto[] = [];
  jwt: JwtObject;

  constructor( private studentExamService: StudentExamService, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.jwt = this.jwtService.decodeJwt()!;
    this.loadStudentExamToDo();
  }

  loadStudentExamToDo() {
    this.studentExamService.getStudentExamsToDo(this.jwt.id).subscribe({
      next: (se) => {
        this.exams = se;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Student not found');
        } else if (err.status === 500) {
          alert('Internal server error');
        }
      }
    })
  }
}
