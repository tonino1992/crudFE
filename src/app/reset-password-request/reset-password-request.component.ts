import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss']
})
export class ResetPasswordRequestComponent {

  userId: string;

  constructor(private userService: UserService) { }

  sendResetLink() {
    if (this.userId !== '') {
      this.userService.recuperaPassword(this.userId)
        .subscribe(
          res => {
            alert("Link per reimpostare la password inviato con successo!");
          },
          error => {
            alert("Errore nell'invio del link, controlla lo user ID che hai inserito sia corretto.");
          }
        );
    }
  }


}
