import { Time } from "@angular/common";

export interface ExamJoinCourseDto {
    id: number;
    day: Date;
    hour: Time;
    vote: number;
    classroom: string;
    courseId: number;
    courseSubject: string;
    teacherName: string;
    teacherSurname: string;

  }
  