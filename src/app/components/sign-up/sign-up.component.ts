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
          error: (error: HttpErrorResponse) => {
            alert("User ID già in uso");
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
            alert("User ID già in uso");
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


}
