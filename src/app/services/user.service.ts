import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '../classes/userDto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = '';

  constructor(private http: HttpClient) { }

  updateUser(userDto: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.baseUrl}/users/update`, userDto);
  }

  addUser(userDto: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/users/add`, userDto);
  }

  login(userDto: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/users/login`, userDto);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/delete/${id}`);
  }

}
