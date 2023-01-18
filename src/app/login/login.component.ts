import { Component } from '@angular/core';
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
    const userDto: UserDto = { userId: this.userId, password: this.password, role: this.role};
    this.userService.login(userDto).subscribe(user => {
      console.log(user);
    });
  }
}

