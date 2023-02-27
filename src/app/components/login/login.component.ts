import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PersonDto } from '../../classes/personDto';
import { UserService } from '../../services/user/user.service';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword = false;
  error = false;
  message: string;
  loginForm: FormGroup;
  passwordValidator: ValidatorFn = Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);



  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userId: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, this.passwordValidator])
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  isValidColor(name: string): string {
    if (this.loginForm.get(name)!.touched) {
      if (this.loginForm.get(name)!.valid) {
        return 'is-valid';
      }
      return 'is-invalid';
    }
    return '';
  }

  login(): void {

    if (this.loginForm.valid) {
      const userDto = {
        userId: this.loginForm.get('userId')!.value,
        password: this.loginForm.get('password')!.value
      };

      this.userService.login(userDto).subscribe({
        next: (jwt: string) => {
          this.message = "Login successful";
          console.log(jwt);
          localStorage.setItem('jwt','Bearer ' + jwt);
          this.router.navigate(['/app']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.error = true;
            this.message = "Invalid username!";
          } else if (err.status === 401) {
            this.error = true;
            this.message = "Incorrect password!";
          } else if (err.status === 500) {
            this.error = true;
            this.message = "Internal error!";
          } else {
            this.error = true;
            this.message = err.error;
            console.log(err.error);            
          }
        }
      });
    } else {
      this.error = true;
      this.message = "Inserisci tutti i campi";
    }
  }
}