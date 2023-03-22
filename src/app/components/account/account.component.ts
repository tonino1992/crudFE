import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtObject } from 'src/app/classes/jwtObject';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  userId: string;
  password: string = '********';
  email: string;
  jwt: JwtObject;

  constructor(private jwtService: JwtService, private userService: UserService) { }

  ngOnInit(): void {
    this.jwt = this.jwtService.decodeJwt();
    this.userId = this.jwt.sub;
    this.email = this.jwt.email;
  }

  changeUserId() {
    const newUserId = prompt("Inserisci il nuovo User ID:");
  
    if (newUserId) {
      const userIds = {
        oldUserId: this.userId,
        newUserId: newUserId
      };
      
      this.userService.changeUserId(userIds).subscribe({
        next: () => {
          alert("User ID cambiato con successo!");
          this.userId = newUserId;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            alert("User non trovato!");
          } else if (err.status === 401) {
            alert("User ID già esistente!");
          } else {
            alert("Errore imprevisto!");
          }
        }
      });
    }
  }
  changePassword(){}
  changeEmail(){}
}
