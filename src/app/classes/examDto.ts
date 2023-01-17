import { Time } from "@angular/common";

export interface ExamDto {
    id: number;
    day: Date;
    hour: Time;
    vote: number;
    classroom: string;
    courseId: number;
  }
  