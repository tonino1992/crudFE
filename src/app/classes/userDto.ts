import { UserRole } from "../enums/user-role";

export class UserDto {
    userId: string;
    password: string;
    role: UserRole;
  
    constructor(userId: string, password: string, role: UserRole) {
      this.userId = userId;
      this.password = password;
      this.role = role;
    }
  }
  