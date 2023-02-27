import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environment/environment';
import { StudentDto } from '../../classes/studentDto';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(`${this.baseUrl}/students/all`);
  }

  getStudentById(id: number): Observable<StudentDto> {
    return this.http.get<StudentDto>(`${this.baseUrl}/students/${id}`);
  }

  addStudent(studentDto: StudentDto): Observable<StudentDto> {
    return this.http.post<StudentDto>(`${this.baseUrl}/students/add`, studentDto);
  }

  updateStudent(studentDto: StudentDto): Observable<StudentDto> {
    return this.http.put<StudentDto>(`${this.baseUrl}/students/update`, studentDto);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/students/delete/${id}`);
  }
}
