import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { StudentDto } from '../classes/studentDto';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = '';

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(`${this.baseUrl}/students/all`);
}

addStudent(student: StudentDto): Observable<StudentDto> {
  return this.http.post<StudentDto>(`${this.baseUrl}/students/add`, student);
}

getStudentById(id: number): Observable<StudentDto> {
  return this.http.get<StudentDto>(`${this.baseUrl}/students/${id}`);
}

updateStudent(student: StudentDto): Observable<StudentDto> {
  return this.http.put<StudentDto>(`${this.baseUrl}/students/update`, student);
}

deleteStudent(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/students/${id}`);
}


}
