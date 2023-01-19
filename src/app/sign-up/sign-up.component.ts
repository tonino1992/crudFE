import { Component } from '@angular/core';
import { StudentDto } from '../classes/studentDto';
import { TeacherDto } from '../classes/teacherDto';
import { UserRole } from '../enums/user-role';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  userId: string = '';
  password: string = '';
  role: string = '';
  surname: string = '';
  age: number = 18;
  name: string = '';

  constructor(private teacherService: TeacherService, private studentService: StudentService) {}


  signup() {
    if (this.userId !== '' && this.password !== '' && this.role !== '' && this.name !== '' && this.surname !== '' && this.age >= 18) {
      if (this.role === 'TEACHER') {
        const teacherDto: TeacherDto = {
          id: 0,
          userId: this.userId,
          password: this.password,
          role: UserRole[this.role] as UserRole,
          name: this.name,
          surname: this.surname,
          age: this.age
      }; 
      console.log(teacherDto);
             this.teacherService.addTeacher(teacherDto).subscribe(
            (user: TeacherDto) => {
              if (user) {
                alert("Registrazione effettuata con successo!");
                console.log(user);
              }
            },
            error => {
              alert("User ID già in uso!");
            }
          );
      } else if (this.role === 'STUDENT'){
        const studentDto: StudentDto = {
          id: 0,
          userId: this.userId,
          password: this.password,
          role: UserRole[this.role] as UserRole,
          name: this.name,
          surname: this.surname,
          age: this.age
        };
        console.log(studentDto);
          this.studentService.addStudent(studentDto).subscribe(
            (user: StudentDto) => {
              if (user) {
                alert("Registrazione effettuata con successo!");
                console.log(user);
              }
            },
            error => {
              alert("User ID già in uso!");
            }
          );
      }
    } else {
      alert("Per favore, compila tutti i campi o verifica che l'età inserita sia almeno 18");
    }
  }

}
