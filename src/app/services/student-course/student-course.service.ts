import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CourseJoinTeacherDto } from '../../classes/courseJoinTeacherDto';
import { StudentCourseDto } from '../../classes/studentCourseDto';
import { StudentDto } from '../../classes/studentDto';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  enrollStudentInCourse(studentCourseDto: {courseId: number, studentId: number}): Observable<StudentCourseDto> {
    return this.http.post<StudentCourseDto>(`${this.baseUrl}/studentcourses/iscription`, studentCourseDto);
  }

  getStudentsByCourse(id: number): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(`${this.baseUrl}/studentcourses/${id}/students`);
  }

  getCoursesByStudent(id: number): Observable<CourseJoinTeacherDto[]> {
    return this.http.get<CourseJoinTeacherDto[]>(`${this.baseUrl}/studentcourses/${id}/courses`)
  }
}
