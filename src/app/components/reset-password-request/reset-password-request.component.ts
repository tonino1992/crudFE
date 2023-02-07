import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss']
})
export class ResetPasswordRequestComponent implements OnInit {

  resetPasswordForm: FormGroup;
  error = false;
  message: string;
  

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      userId: new FormControl(null, Validators.required),
    })
  }

  sendResetLink() {
    if (this.resetPasswordForm.valid) {
      this.userService.recuperaPassword(this.resetPasswordForm.value.userId)
        .subscribe({
          next: () => {
            this.message = "Link per reimpostare la password inviato con successo!";
            this.router.navigate(['/login']);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.error = true;
              this.message = "Invalid username!";
            } else if (err.status === 500) {
              this.error = true;
              this.message = "Internal error!";
            }
          }
        });
    }
  }
}
