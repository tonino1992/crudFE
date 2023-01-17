import { Time } from "@angular/common";

export class ExamJoinCourseDto {
    id: number;
    day: Date;
    hour: Time;
    vote: number;
    classroom: string;
    courseId: number;
    courseSubject: string;
    teacherName: string;
    teacherSurname: string;
  
    constructor(id: number, day: Date, hour: Time, vote: number, classroom: string, courseId: number, courseSubject: string, teacherName: string, teacherSurname: string) {
      this.id = id;
      this.day = day;
      this.hour = hour;
      this.vote = vote;
      this.classroom = classroom;
      this.courseId = courseId;
      this.courseSubject = courseSubject;
      this.teacherName = teacherName;
      this.teacherSurname = teacherSurname;
    }
  }
  