import { PersonDto } from "./personDto";
import { UserRole } from "./enums/user-role";

export interface TeacherDto extends PersonDto {
    password: string;
    email: string;
  }
  