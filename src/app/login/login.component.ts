import { Component } from '@angular/core';
import { PersonDto } from '../classes/personDto';
import { UserDto } from '../classes/userDto';
import { UserRole } from '../enums/user-role';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userId: string = '';
  password: string = '';
  role: UserRole = UserRole.NOTHING;
  showPassword = false;

  constructor(private userService: UserService) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  
  login(): void {
    if (this.userId !== '' && this.password !== '') {
      const userDto: UserDto = { userId: this.userId, password: this.password, role: this.role };
      console.log(userDto);
      this.userService.login(userDto).subscribe(
        (user: PersonDto) => {
          if (user) {
            alert("Login effettuato con successo!");
            console.log(user);
          } else {
            alert("Utente non trovato!");
          }
        },
        error => {
          alert("Utente non trovato!");
        }
      );
    } else {
      alert("Per favore, compila tutti i campi!");
    }
  }
  
  
  
}




