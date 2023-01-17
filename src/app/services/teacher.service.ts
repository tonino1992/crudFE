import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseDto } from '../classes/courseJoinTeacherDto';
import { ExamDto } from '../classes/examJoinCourseDto';
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

  addTeacher(teacher: TeacherDto) {
    return this.http.post<TeacherDto>(`${this.baseUrl}/add`, teacher);
  }

  updateTeacher(teacherDto: TeacherDto) {
    return this.http.put<TeacherDto>('/teachers/update', teacherDto);
  }

  deleteTeacher(id: number) {
    return this.http.delete(`/teachers/delete/${id}`);
  }
}
