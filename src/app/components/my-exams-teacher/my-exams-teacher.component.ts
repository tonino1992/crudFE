import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExamJoinCourseDto } from 'src/app/classes/examJoinCourseDto';
import { JwtObject } from 'src/app/classes/jwtObject';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { ManageExamsComponent } from '../mangage-exams/mangage-exams.component';

@Component({
  selector: 'app-my-exams-teacher',
  templateUrl: './my-exams-teacher.component.html',
  styleUrls: ['./my-exams-teacher.component.scss']
})
export class MyExamsTeacherComponent implements OnInit{

  exams: ExamJoinCourseDto[] = [];
  jwt: JwtObject;

  constructor(private jwtService: JwtService, private teacherService: TeacherService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.jwt = this.jwtService.decodeJwt()!;
    this.loadTeacherExam();
  }

  loadTeacherExam() {
    this.teacherService.getTeacherExams(this.jwt.id).subscribe({
      next: (e) => {
        this.exams = e;        
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Teacher not found');
        } else if (err.status === 500) {
          alert('Internal server error');
        }
      }
    })
  }
  
  manageExam(examId: number) {
    const dialogRef = this.dialog.open(ManageExamsComponent, {
      width: '500px', // specifica la larghezza del modal
      data: { examId: examId } // passa l'id dell'esame al componente modal
    });
  }
}
