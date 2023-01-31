import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from '../services/token.service';
import { UserDto } from '../classes/userDto';
import { UserRole } from '../enums/user-role';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  userId: string;
  password: string;
  confirmedPassword: string;
  error = false;
  message: string;
  showPassword = false;
  showConfirmedPassword = false;

  constructor(
    private rout: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmedPassword() {
    this.showConfirmedPassword = !this.showConfirmedPassword;
  }

  ngOnInit(): void {
    const token = this.rout.snapshot.paramMap.get('id')!;
    this.tokenService.verifyTokenValidity(token).subscribe({
      next: (userId: string) => {
        this.userId = userId;
        console.log(this.userId)
        console.log(userId)
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.log("Token non valido");
          this.error = true;
          this.message = "Il link non è valido, prova a richiederne un altro!";
        } else if (error.status === 401) {
          console.log("Token scaduto");
          this.error = true;
          this.message = "Il link è scaduto, richiedine un altro!";
        }
        else {
          alert(error.message)
        }
      }
    })
  }





  changePassword() {
    if (this.password === '' || this.confirmedPassword === '') {
      alert("Inserisci tutti i campi!")
    }
    else if (this.password !== this.confirmedPassword) {
      alert("Le password sono diverse!")
    } else {
      const userDto = { userId: this.userId, password: this.password }
      console.log(userDto);
      this.tokenService.changePassword(userDto).subscribe({
        next: () => {
          alert("Password cambiata con successo!");
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          alert("Errore durante il cambio della password. Riprova più tardi.");
          console.error(error.message);
        }
      }
      );
    }

  }


}





