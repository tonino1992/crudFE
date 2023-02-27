import { Component, OnInit } from '@angular/core';
import { CourseJoinTeacherDto } from 'src/app/classes/courseJoinTeacherDto';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { StudentCourseService } from 'src/app/services/student-course/student-course.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  courses: CourseJoinTeacherDto[] = [];
  userName: string;
  constructor(private studentCourseService: StudentCourseService, private jwtService: JwtService) { }

  ngOnInit(): void {  
   this.userName = this.jwtService.decodeJwt()!.name + ' ' + this.jwtService.decodeJwt()!.surname;
  }


}
