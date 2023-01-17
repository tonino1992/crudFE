import { UserRole } from "../enums/user-role";

export interface PersonDto {
    id: number;
    userId: string;
    name: string;
    surname: string;
    age: number;
    role: UserRole;

}
