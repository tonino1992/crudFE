import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { PersonDto } from '../classes/personDto';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userId: string;
  password: string;
  showPassword = false;
  error = false;
  message: string;

  constructor(private userService: UserService) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    if (this.userId !== '' && this.password !== '') {
      const userDto = { userId: this.userId, password: this.password };
      console.log(userDto);
      this.userService.login(userDto).subscribe({
        next: (userDto: PersonDto) => {
          this.message = "Login effettuato con successo"
          console.log(userDto)
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            console.log("Token non valido");
            this.error = true;
            this.message = "Il link non è valido, prova a richiederne un altro!";
          } else if (err.status === 401) {
            this.error = true;
            this.message = "Il link è scaduto, richiedine un altro!";
          }
          else if (err.status === 500) {
            this.error = true;
            this.message = "Errore interno!"
          }
          else {
            this.error = true;
            this.message = err.error;
          }
        }
      })
    }



  }
}




