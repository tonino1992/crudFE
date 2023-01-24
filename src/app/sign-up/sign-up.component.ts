import { HttpErrorResponse } from '@angular/common/http';
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
  confirmPassword: string = '';
  role: string = '';
  surname: string = '';
  dateOfBirth: Date = new Date;
  name: string = '';

  constructor(private teacherService: TeacherService, private studentService: StudentService) {}


  signup() {
    if (!this.passwordConfirmed()){
      alert("Controlla la password!");
      return;
    }
    if (this.userId !== '' && this.password !== '' && this.confirmPassword !== '' && this.role !== '' && this.name !== '' && this.surname !== '' && this.dateOfBirth !== null) {
      if (this.role === 'TEACHER') {
        const teacherDto: TeacherDto = {
          id: 0,
          userId: this.userId,
          password: this.password,
          role: UserRole[this.role] as UserRole,
          name: this.name,
          surname: this.surname,
          dateOfBirth: this.dateOfBirth
      }; 
      console.log(teacherDto);
             this.teacherService.addTeacher(teacherDto).subscribe({
           next: (user: TeacherDto) => {
              if (user) {
                alert("Registrazione effettuata con successo!");
                console.log(user);
              }
            },
            error: (error: HttpErrorResponse) => {
              alert(error.message);
            }
      });
      } else if (this.role === 'STUDENT'){
        const studentDto: StudentDto = {
          id: 0,
          userId: this.userId,
          password: this.password,
          role: UserRole[this.role] as UserRole,
          name: this.name,
          surname: this.surname,
          dateOfBirth: this.dateOfBirth
        };
        console.log(studentDto);
          this.studentService.addStudent(studentDto).subscribe({
            next: (user: StudentDto) => {
              if (user) {
                alert("Registrazione effettuata con successo!");
                console.log(user);
              }
            },
            error: (error: HttpErrorResponse) => {
              alert(error.message);
            }
      });
      }
    } else {
      alert("Per favore, compila tutti i campi o verifica che l'età inserita sia almeno 18");
    }
  }

  passwordConfirmed() {
    return this.password === this.confirmPassword;
  }


}
