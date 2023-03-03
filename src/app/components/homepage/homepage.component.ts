import { Component, OnInit } from '@angular/core';
import { CourseJoinTeacherDto } from 'src/app/classes/courseJoinTeacherDto';
import { ExamJoinCourseDto } from 'src/app/classes/examJoinCourseDto';
import { JwtObject } from 'src/app/classes/jwtObject';
import { CourseService } from 'src/app/services/course/course.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { StudentCourseService } from 'src/app/services/student-course/student-course.service';
import { StudentExamService } from 'src/app/services/student-exam/student-exam.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  courses: CourseJoinTeacherDto[] = [];
  exams: ExamJoinCourseDto[] = [];
  userName: string;
  jwt: JwtObject;
  currentCoursePage = 1;
  itemsCoursePerPage = 5;
  currentExamPage = 1;
  itemsExamPerPage = 5;
  constructor(private studentCourseService: StudentCourseService, private courseService: CourseService,
    private studentExamService: StudentExamService, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.jwt = this.jwtService.decodeJwt()!;    
   
  }

 

  
}