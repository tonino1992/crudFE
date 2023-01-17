import { PersonDto } from "./personDto";
import { UserRole } from "../enums/user-role";

export class TeacherDto extends PersonDto {
    password: string;
  
    constructor(id: number, userId: string, name: string, surname: string, age: number,role: UserRole, password: string) {
      super(id, userId, name, surname, age, role);
      this.password = password;
    }
  
    getRole(): UserRole {
      return UserRole.TEACHER;
    }
  }
  