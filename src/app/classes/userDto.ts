import { UserRole } from "../enums/user-role";

export interface UserDto {
    userId: string;
    password: string;
    role: UserRole;
  }
  