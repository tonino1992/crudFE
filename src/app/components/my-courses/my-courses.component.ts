import { Component, OnInit } from '@angular/core';
import { JwtObject } from 'src/app/classes/jwtObject';
import { JwtService } from 'src/app/services/jwt/jwt.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit{

jwt: JwtObject;

constructor(private jwtService: JwtService){}

  ngOnInit(): void {
    this.jwt = this.jwtService.decodeJwt();
  }

}
