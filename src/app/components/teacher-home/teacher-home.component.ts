import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseDto } from 'src/app/classes/courseDto';
import { ExamJoinCourseDto } from 'src/app/classes/examJoinCourseDto';
import { JwtObject } from 'src/app/classes/jwtObject';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {

  courses: CourseDto[] = [];
  exams: ExamJoinCourseDto[] = [];
  userName: string;
  jwt: JwtObject;
  //variabili paginazione
  currentCoursePage = 1;
  itemsCoursePerPage = 5;
  coursePages: number[] = [];
  currentExamPage = 1;
  itemsExamPerPage = 5;
  examPages: number[] = [];

  constructor(private jwtService: JwtService, private teacherService: TeacherService, private router: Router) { }

  ngOnInit(): void {
    this.jwt = this.jwtService.decodeJwt()!;
    this.loadTeacherCourses();
    this.loadTeacherExam();
  }


  //METODI INSEGNANTE
  loadTeacherCourses() {
    this.teacherService.getTeacherCourses(this.jwt.id).subscribe({
      next: (c) => {
        this.courses = c;
        this.calculateCoursePages();
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

  loadTeacherExam() {
    this.teacherService.getTeacherExams(this.jwt.id).subscribe({
      next: (e) => {
        this.exams = e;
        this.calculateExamPages();
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

  addExam(courseId: number) { }
  manageExam(examId: number) {
    this.router.navigate(['app/manageexam/', examId])
   }
  //FINE METODI INSEGNANTE

  //GESTIONE DELLA PAGINAZIONE

  //courses
  goToCoursePage(page: number): void {
    this.currentCoursePage = page;
  }

  calculateCoursePages(): void {
    const numPages = Math.ceil(this.courses.length / this.itemsCoursePerPage);
    this.coursePages = Array.from({ length: numPages }, (_, i) => i + 1);
  }

  previousCoursePage(): void {
    if (this.currentCoursePage > 1) {
      this.currentCoursePage--;
    }
  }

  nextCoursePage(): void {
    if (this.currentCoursePage < this.coursePages.length) {
      this.currentCoursePage++;
    }
  }

  //exams
  goToExamPage(page: number): void {
    this.currentExamPage = page;
  }


  calculateExamPages(): void {
    const numPages = Math.ceil(this.exams.length / this.itemsExamPerPage);
    this.examPages = Array.from({ length: numPages }, (_, i) => i + 1);
  }

  previousExamPage(): void {
    if (this.currentExamPage > 1) {
      this.currentExamPage--;
    }
  }

  nextExamPage(): void {
    if (this.currentExamPage < this.examPages.length) {
      this.currentExamPage++;
    }
  }

  //FINE GESTIONE DELLA PAGINAZIONE
}
