import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseDto } from '../classes/courseDto';
import { ExamDto } from '../classes/examDto';
import { TeacherDto } from '../classes/teacherDto';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  baseUrl = ''

  constructor(private http: HttpClient) { }

  getAllTeachers() {
    return this.http.get<TeacherDto[]>(`${this.baseUrl}/all`);
  }

  getTeacherById(id: number) {
    return this.http.get<TeacherDto>(`${this.baseUrl}/${id}`);
  }

  getTeacherCourses(id: number) {
    return this.http.get<CourseDto[]>(`${this.baseUrl}/${id}/courses`);
  }

  getTeacherExams(id: number) {
    return this.http.get<ExamDto[]>(`${this.baseUrl}/${id}/exams`);
  }

  addTeacher(teacherDto: TeacherDto) {
    return this.http.post<TeacherDto>(`${this.baseUrl}/add`, teacherDto);
  }
}
