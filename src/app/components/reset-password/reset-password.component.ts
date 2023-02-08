import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  userId: string;
  resetPasswordForm: FormGroup;
  error = false;
  errorSettings = false;
  message: string;
  showPassword = false;
  showConfirmedPassword = false;

  passwordValidator: ValidatorFn = Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

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

  isValidColor(name: string): string {
    if (this.resetPasswordForm.get(name)!.touched) {
      if (this.resetPasswordForm.get(name)!.valid) {
        return 'is-valid';
      }
      return 'is-invalid';
    }
    return '';
  }

  ngOnInit(): void {
    const token = this.rout.snapshot.paramMap.get('id')!;
    this.tokenService.verifyTokenValidity(token).subscribe({
      next: (userId: string) => {
        this.userId = userId;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.error = true;
          this.message = "Il link non è valido, prova a richiederne un altro!";
        } else if (err.status === 401) {
          this.error = true;
          this.message = "Il link è scaduto, richiedine un altro!";
        }
        else {
          alert(err.message)
        }
      }
    })

    this.resetPasswordForm = new FormGroup({
      password: new FormControl(null, [Validators.required, this.passwordValidator]),
      confirmPassword: new FormControl(null, [Validators.required, this.passwordValidator]),
    })
  }





  changePassword() {

    if (this.resetPasswordForm.valid) {
      if (this.resetPasswordForm.get('password')!.value !== this.resetPasswordForm.get('confirmPassword')!.value) {
        this.errorSettings = true;
        this.message = "Le password devono essere uguali";
        return;
      }

      const userDto = {
        userId: this.userId,
        password: this.resetPasswordForm.get('password')!.value
      };

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
    } else {
      this.errorSettings = true;
      this.message = "Inserisci tutti i campi!";
    }
  }

}





