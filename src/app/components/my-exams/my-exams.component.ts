import { Component, OnInit } from '@angular/core';
import { JwtObject } from 'src/app/classes/jwtObject';
import { JwtService } from 'src/app/services/jwt/jwt.service';

@Component({
  selector: 'app-my-exams',
  templateUrl: './my-exams.component.html',
  styleUrls: ['./my-exams.component.scss']
})
export class MyExamsComponent implements OnInit{
  
  jwt: JwtObject;

  constructor(private jwtService: JwtService){}
  
    ngOnInit(): void {
      this.jwt = this.jwtService.decodeJwt();
    }
}
