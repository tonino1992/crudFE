import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtObject } from 'src/app/classes/jwtObject';
import { JwtService } from 'src/app/services/jwt/jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  jwt: JwtObject;

  constructor(private router: Router, private jwtService: JwtService){}

  ngOnInit(): void {
    this.jwt = this. jwtService.decodeJwt();
  }  

  logout() {
    localStorage.removeItem('jwt'); // Rimuovi il token dalla localStorage
    this.router.navigate(['/login']); // Vai alla pagina di login
  }

}
