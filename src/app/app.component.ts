import { Component, OnInit } from '@angular/core';
import { JwtService } from './services/jwt/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'universityfe';
  constructor(private jwtService: JwtService){}

 
  



}
