import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CourseDto } from 'src/app/classes/courseDto';
import { JwtObject } from 'src/app/classes/jwtObject';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-my-courses',
  templateUrl: './teacher-my-courses.component.html',
  styleUrls: ['./teacher-my-courses.component.scss']
})
export class TeacherMyCoursesComponent {
  jwt: JwtObject;
  courses: CourseDto[] = [];

  constructor(private jwtService: JwtService, private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.jwt = this.jwtService.decodeJwt()!;
    this.loadTeacherCourses();
  }

  loadTeacherCourses() {
    this.teacherService.getTeacherCourses(this.jwt.id).subscribe({
      next: (c) => {
        this.courses = c;
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
}
