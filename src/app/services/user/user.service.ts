import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '../../classes/userDto';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { PersonDto } from '../../classes/personDto';
import { ChangeUserIdDto } from 'src/app/classes/changeUserIdDto';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  updateUser(userDto: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.baseUrl}/users/update`, userDto);
  }

  addUser(userDto: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/users/add`, userDto);
  }

  login(userDto: {userId: string, password: string}): Observable<string> {
    return this.http.post(`${this.baseUrl}/users/login`, userDto, {responseType: 'text'});
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/delete/${userId}`);
  }

  recuperaPassword(userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/recupera-password`, userId);
  }

  changeUserId(userIds: ChangeUserIdDto): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/change-userid`, userIds);
  }

}
