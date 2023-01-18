import { Component } from '@angular/core';
import { map } from 'rxjs';
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

  constructor(private userService: UserService) {}
  
  login() {
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




