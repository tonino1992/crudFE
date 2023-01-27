import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { UserDto } from '../classes/userDto';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  verifyTokenValidity(token: string): Observable<string>{
    return this.http.post(`${this.baseUrl}/token/verify-token`, token, {responseType: 'text'});
  }

  changePassword(userDto: UserDto): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/token/change-password`, userDto);
  }
  
}
