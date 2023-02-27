import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { JwtObject } from 'src/app/classes/jwtObject';

@Injectable({
  providedIn: 'root'
})


export class JwtService {    

  constructor() { }

  decodeJwt(): JwtObject {
    const jwt = localStorage.getItem('jwt')    
      return jwt_decode(jwt!);    
  }

}
