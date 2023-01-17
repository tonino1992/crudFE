import { PersonDto } from "./personDto";
import { UserRole } from "../enums/user-role";

export interface StudentDto extends PersonDto {
    password: string;
  

  }
  