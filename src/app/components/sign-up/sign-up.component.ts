import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { StudentDto } from '../../classes/studentDto';
import { TeacherDto } from '../../classes/teacherDto';
import { UserRole } from '../../classes/enums/user-role';
import { StudentService } from '../../services/student/student.service';
import { TeacherService } from '../../services/teacher/teacher.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  error = false;
  message: string;
  signUpForm: FormGroup;
  showPassword = false;
  showConfirmedPassword = false;
  passwordValidator: ValidatorFn = Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

  constructor(private teacherService: TeacherService, private studentService: StudentService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      userId: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, this.passwordValidator]),
      confirmPassword: new FormControl(null, [Validators.required, this.passwordValidator]),
      role: new FormControl(null, Validators.required)
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmedPassword() {
    this.showConfirmedPassword = !this.showConfirmedPassword;
  }

  signup() {
    if (this.signUpForm.valid) {
      if (!this.passwordConfirmed()) {
        alert("Controlla la password!");
        return;
      }

      if (this.signUpForm.value.role === 'TEACHER') {
        const actualRole: UserRole = this.signUpForm.value.role as UserRole;
        const teacherDto: TeacherDto = {
          id: 0,
          userId: this.signUpForm.value.userId,
          email: this.signUpForm.value.email,
          password: this.signUpForm.value.password,
          role: actualRole,
          name: this.signUpForm.value.name,
          surname: this.signUpForm.value.surname,
          dateOfBirth: this.signUpForm.value.dateOfBirth
        };
        console.log(teacherDto);
        this.teacherService.addTeacher(teacherDto).subscribe({
          next: (user: TeacherDto) => {
            if (user) {
              alert("Registrazione effettuata con successo!");
              console.log(user);
            }
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 401) {
              this.error = true;
              this.message = "User già in uso";
            } else if (err.status === 500) {
              this.error = true;
              this.message = "Errore interno al server";
            } else {
              this.error = true;
              this.message = err.error;
            }
          }
        });
      } else if (this.signUpForm.value.role === 'STUDENT') {
        const actualRole: UserRole = this.signUpForm.value.role as UserRole;
        const studentDto: StudentDto = {
          id: 0,
          userId: this.signUpForm.value.userId,
          email: this.signUpForm.value.email,
          password: this.signUpForm.value.password,
          role: actualRole,
          name: this.signUpForm.value.name,
          surname: this.signUpForm.value.surname,
          dateOfBirth: this.signUpForm.value.dateOfBirth
        };
        console.log(studentDto);
        this.studentService.addStudent(studentDto).subscribe({
          next: (user: StudentDto) => {
            if (user) {
              alert("Registrazione effettuata con successo!");
              console.log(user);
            }
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 401) {
              alert("User già in uso")
            } else if (err.status === 500) {
              alert("Errore interno al server")
            } else {
              alert(err.error)
            }
          }
        });
      }
    } else {
      alert("Per favore, compila tutti i campi!");
      console.log(this.signUpForm);

    }
  }

  passwordConfirmed() {
    return this.signUpForm.value.password === this.signUpForm.value.confirmPassword;
  }

  isValidColor(name: string): string {
    if (this.signUpForm.get(name)!.touched) {
      if (this.signUpForm.get(name)!.valid) {
        return 'is-valid';
      }
      return 'is-invalid';
    }
    return '';
  }

}
