import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseDto } from 'src/app/classes/courseDto';
import { JwtObject } from 'src/app/classes/jwtObject';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { AddExamComponent } from '../add-exam/add-exam.component';

@Component({
  selector: 'app-teacher-my-courses',
  templateUrl: './teacher-my-courses.component.html',
  styleUrls: ['./teacher-my-courses.component.scss']
})
export class TeacherMyCoursesComponent {
  jwt: JwtObject;
  courses: CourseDto[] = [];

  constructor(private jwtService: JwtService, private teacherService: TeacherService, public dialog: MatDialog) { }

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

  addExam(courseId: number) {
    const dialogRef = this.dialog.open(AddExamComponent, {
      width: '500px', // specifica la larghezza del modal
      data: { courseId: courseId } // passa l'id dell'corso al componente modal
    });
  }
}