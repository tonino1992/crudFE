import { UserRole } from "./enums/user-role";

export interface UserDto {
    userId: string;
    email: string;
    password: string;
    role: UserRole;
  }
  