import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseJoinTeacherDto } from 'src/app/classes/courseJoinTeacherDto';
import { JwtObject } from 'src/app/classes/jwtObject';
import { StudentExamDto } from 'src/app/classes/studentExamDto';
import { CourseService } from 'src/app/services/course/course.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { StudentCourseService } from 'src/app/services/student-course/student-course.service';
import { StudentExamService } from 'src/app/services/student-exam/student-exam.service';

@Component({
  selector: 'app-student-my-courses',
  templateUrl: './student-my-courses.component.html',
  styleUrls: ['./student-my-courses.component.scss']
})
export class StudentMyCoursesComponent implements OnInit {


  constructor(private jwtService: JwtService, private studentCourseService: StudentCourseService,
    private courseService: CourseService, private studentExamService: StudentExamService) { }

  courses: CourseJoinTeacherDto[] = [];
  jwt: JwtObject;

  ngOnInit(): void {
    this.jwt = this.jwtService.decodeJwt();
    this.loadStudentCourses();
  }

  loadStudentCourses() {
    this.studentCourseService.getCoursesByStudent(this.jwt.id).subscribe({
      next: (sc) => {
        this.courses = sc;
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
          next:() => {
            alert("Prenotazione riuscita!");
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

}
