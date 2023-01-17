import { UserRole } from "../enums/user-role";

export class PersonDto {
    id: number;
    userId: string;
    name: string;
    surname: string;
    age: number;
    role: UserRole;

    constructor(id: number, userId: string, name: string, surname: string, age: number, role: UserRole) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.role = role;
    }
}
