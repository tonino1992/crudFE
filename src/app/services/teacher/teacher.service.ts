import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamJoinCourseDto } from 'src/app/classes/examJoinCourseDto';
import { environment } from 'src/environment/environment';
import { CourseDto } from '../../classes/courseDto';
import { TeacherDto } from '../../classes/teacherDto';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllTeachers(): Observable<TeacherDto[]> {
    return this.http.get<TeacherDto[]>(`${this.baseUrl}/teachers/all`);
  }

  getTeacherById(id: number): Observable<TeacherDto> {
    return this.http.get<TeacherDto>(`${this.baseUrl}/teachers/${id}`);
  }

  getTeacherCourses(id: number): Observable<CourseDto[]> {
    return this.http.get<CourseDto[]>(`${this.baseUrl}/teachers/${id}/courses`);
  }

  getTeacherExams(id: number): Observable<ExamJoinCourseDto[]> {
    return this.http.get<ExamJoinCourseDto[]>(`${this.baseUrl}/teachers/${id}/exams`);
  }

  addTeacher(teacherDto: TeacherDto): Observable<TeacherDto> {
    return this.http.post<TeacherDto>(`${this.baseUrl}/teachers/add`, teacherDto);
  }

  updateTeacher(teacherDto: TeacherDto): Observable<TeacherDto> {
    return this.http.put<TeacherDto>(`${this.baseUrl}/teachers/update`, teacherDto);
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/teachers/delete/${id}`);
  }

}
