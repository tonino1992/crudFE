import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseJoinTeacherDto } from 'src/app/classes/courseJoinTeacherDto';
import { ExamJoinCourseDto } from 'src/app/classes/examJoinCourseDto';
import { JwtObject } from 'src/app/classes/jwtObject';
import { StudentExamDto } from 'src/app/classes/studentExamDto';
import { CourseService } from 'src/app/services/course/course.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { StudentCourseService } from 'src/app/services/student-course/student-course.service';
import { StudentExamService } from 'src/app/services/student-exam/student-exam.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {

  courses: CourseJoinTeacherDto[] = [];
  exams: ExamJoinCourseDto[] = [];
  userName: string;
  jwt: JwtObject;
  //variabili per la paginazione
  currentCoursePage = 1;
  itemsCoursePerPage = 5;
  coursePages: number[] = [];
  currentExamPage = 1;
  itemsExamPerPage = 5;
  examPages: number[] = [];

  constructor(private studentCourseService: StudentCourseService, private courseService: CourseService,
    private studentExamService: StudentExamService, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.jwt = this.jwtService.decodeJwt()!;
    this.loadStudentCourses();
    this.loadStudentExamToDo();
  }
  
  //METODI STUDENTE
  loadStudentExamToDo() {
    this.studentExamService.getStudentExamsToDo(this.jwt.id).subscribe({
      next: (se) => {
        this.exams = se;
        this.calculateExamPages();
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

  loadStudentCourses() {
    this.studentCourseService.getCoursesByStudent(this.jwt.id).subscribe({
      next: (sc) => {
        this.courses = sc;
        this.calculateCoursePages();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert("Student not found.");
        } else {
          alert("Internal server error");
        }
      }
    });
  }

  bookExam(courseId: number) {
    this.courseService.getExamIdByCourseId(courseId).subscribe({
      next: (examId: number) => {
        const studentExamDto = {
          studentId: this.jwt.id,
          examId: examId
        };
        this.studentExamService.bookStudentExam(studentExamDto).subscribe({
          next: (studentExamDto: StudentExamDto) => {
            alert("Prenotazione riuscita!")
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 404) {
              alert("Student not found.");
            } else if (err.status === 400) {
              alert("Exam not found.");
            } else if (err.status === 409) {
              alert("Hai già prenotato questo esame.");
            } else {
              alert("An error occurred while booking the exam. Please try again later.");
            }
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert(`Course not found`);
        } else {
          alert(`Internal server error`);
        }
      }
    });
  }
  //FINE METODI STUDENTE

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
