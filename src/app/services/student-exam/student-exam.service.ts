import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentExamDto } from '../../classes/studentExamDto';
import { ExamJoinCourseDto } from '../../classes/examJoinCourseDto';
import { environment } from 'src/environment/environment';
import { StudentDto } from 'src/app/classes/studentDto';

@Injectable({
  providedIn: 'root'
})
export class StudentExamService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  bookStudentExam(studentExamDto: {studentId: number, examId: number}): Observable<StudentExamDto> {
    return this.http.post<StudentExamDto>(`${this.baseUrl}/studentexams/booking`, studentExamDto);
  }

  updateStudentExam(studentExamDto: StudentExamDto): Observable<StudentExamDto> {
    return this.http.put<StudentExamDto>(`${this.baseUrl}/studentexams/updatevote`, studentExamDto);
  }

  getStudentExamsToDo(id: number): Observable<ExamJoinCourseDto[]> {
    return this.http.get<ExamJoinCourseDto[]>(`${this.baseUrl}/studentexams/${id}/examstodo`);
  }

  getStudentsByExam(id: number): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(`${this.baseUrl}/studentexams/${id}/students`);
  }

  getStudentExamsDone(id: number): Observable<ExamJoinCourseDto[]> {
    return this.http.get<ExamJoinCourseDto[]>(`${this.baseUrl}/studentexams/${id}/examsdone`);
  }

  getStudentExamsByExam(id: number): Observable<StudentExamDto[]> {
    return this.http.get<StudentExamDto[]>(`${this.baseUrl}/studentexams/${id}/all`);
  }

  getDoneExamsByStudent(id: number): Observable<StudentExamDto[]> {
    return this.http.get<StudentExamDto[]>(`${this.baseUrl}/studentexams/${id}/doneexams`);
  }
  
  

}
