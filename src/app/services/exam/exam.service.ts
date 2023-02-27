import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExamDto } from '../../classes/examDto';
import { ExamJoinCourseDto } from '../../classes/examJoinCourseDto';
import { StudentDto } from '../../classes/studentDto';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllExams(): Observable<ExamJoinCourseDto[]> {
    return this.http.get<ExamJoinCourseDto[]>(`${this.baseUrl}/exams/all`);
  }

  getExamById(id: number): Observable<ExamJoinCourseDto> {
    return this.http.get<ExamJoinCourseDto>(`${this.baseUrl}/exams/${id}`);
  }

  addExam(examDto: ExamDto): Observable<ExamDto> {
    return this.http.post<ExamDto>(`${this.baseUrl}/exams/add`, examDto);
  }

  updateExam(examDto: ExamDto): Observable<ExamDto> {
    return this.http.put<ExamDto>(`${this.baseUrl}/exams/update`, examDto);
  }

  deleteExam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/exams/delete/${id}`);
  }
}
