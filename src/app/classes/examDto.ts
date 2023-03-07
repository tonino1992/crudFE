import { Time } from "@angular/common";

export interface ExamDto {
    id?: number;
    day: Date;
    hour: Time;
    classroom: string;
    done: boolean;
    courseId: number;
  }
  