import { Time } from "@angular/common";

export interface ExamDto {
    id: number;
    day: Date;
    hour: Time;
    classroom: string;
    isDone: boolean;
    courseId: number;
  }
  