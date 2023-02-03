import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentExamDto } from '../../classes/studentExamDto';
import { ExamJoinCourseDto } from '../../classes/examJoinCourseDto';

@Injectable({
  providedIn: 'root'
})
export class StudentExamService {
  private baseUrl = '/studentexams';

  constructor(private http: HttpClient) { }

  studentExamBooking(studentExamDto: StudentExamDto): Observable<StudentExamDto> {
    return this.http.post<StudentExamDto>(`${this.baseUrl}/booking`, studentExamDto);
  }

  studentExamUpdateVote(studentExamDto: StudentExamDto): Observable<StudentExamDto> {
    return this.http.put<StudentExamDto>(`${this.baseUrl}/updatevote`, studentExamDto);
  }
  
  getExamsToDoByStudent(id: number): Observable<ExamJoinCourseDto[]> {
    return this.http.get<ExamJoinCourseDto[]>(`${this.baseUrl}/${id}/examstodo`);
  }

  getExamsDoneByStudent(id: number): Observable<ExamJoinCourseDto[]> {
    return this.http.get<ExamJoinCourseDto[]>(`${this.baseUrl}/${id}/examsdone`);
  }
}
