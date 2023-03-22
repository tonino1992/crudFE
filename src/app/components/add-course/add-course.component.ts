import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CourseDto } from 'src/app/classes/courseDto';
import { JwtObject } from 'src/app/classes/jwtObject';
import { CourseService } from 'src/app/services/course/course.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  courseForm: FormGroup;
  jwt: JwtObject;


  constructor(private courseService: CourseService, private jwtService: JwtService, public dialogRef: MatDialogRef<AddCourseComponent>) { }


  ngOnInit(): void {
    this.jwt = this.jwtService.decodeJwt();
    this.courseForm = new FormGroup({
      subject: new FormControl(null, Validators.required),
      hourAmount: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const newCourse: CourseDto = {
        subject: this.courseForm.value.subject,
        hourAmount: +this.courseForm.value.hourAmount,
        done: false,
        teacherId: this.jwt.id
      };
      this.courseService.addCourse(newCourse).subscribe({
        next: (c) => {
          alert("Corso generato con successo!")
          this.dialogRef.close();
          window.location.reload();
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 500) {
            alert(`Internal server error!`);
          } else {
            alert(`ERRORE!!!`);
          }
        }
      })
    } else {
      alert('Inserisci tutti i campi!')
    }
  }

  deleteAction() {
    this.dialogRef.close();
  }

}
