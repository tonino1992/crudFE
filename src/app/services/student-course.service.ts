import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseJoinTeacherDto } from '../classes/courseJoinTeacherDto';
import { StudentCourseDto } from '../classes/studentCourseDto';
import { StudentDto } from '../classes/studentDto';


@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {
  private baseUrl = '';

  constructor(private http: HttpClient) {}

  studentCourseIscription(studentCourseDto: StudentCourseDto): Observable<StudentCourseDto> {
    return this.http.post<StudentCourseDto>(`${this.baseUrl}/studentcourses/iscription`, studentCourseDto);
  }

  getStudentsByCourse(id: number): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(`${this.baseUrl}/studentcourses/${id}/students`);
  }

  getCoursesByStudent(id: number): Observable<CourseJoinTeacherDto[]> {
    return this.http.get<CourseJoinTeacherDto[]>(`${this.baseUrl}/studentcourses/${id}/courses`);
  }
}