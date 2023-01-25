import { PersonDto } from "./personDto";

export interface StudentDto extends PersonDto {
  password: string;
  email: string;

}
