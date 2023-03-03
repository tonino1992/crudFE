import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseJoinTeacherDto } from '../../classes/courseJoinTeacherDto';
import { CourseDto } from '../../classes/courseDto';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<CourseJoinTeacherDto[]> {
    return this.http.get<CourseJoinTeacherDto[]>(`${this.baseUrl}/courses/all`);
  }

  getCourseById(id: number): Observable<CourseJoinTeacherDto> {
    return this.http.get<CourseJoinTeacherDto>(`${this.baseUrl}/courses/${id}`);
  }

  addCourse(courseDto: CourseDto): Observable<CourseDto> {
    return this.http.post<CourseDto>(`${this.baseUrl}/courses/add`, courseDto);
  }

  updateCourse(courseDto: CourseDto): Observable<CourseDto> {
    return this.http.put<CourseDto>(`${this.baseUrl}/courses/update`, courseDto);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/courses/delete/${id}`);
  }

  getExamIdByCourseId(courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses/exams/${courseId}`);
  }
  

}
