import { Injectable } from '@angular/core';
import { JwtService } from '../jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtService: JwtService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedToken = this.jwtService.decodeJwt();
      const expirationTime = decodedToken.exp.getTime() * 1000; // converti il tempo di scadenza in millisecondi
      const isExpired = Date.now() > expirationTime; // verifica se il token è scaduto
      return !isExpired; // se il token non è scaduto, l'utente è autenticato
    }
    return false; // se il token non è presente, l'utente non è autenticato
  }

}
