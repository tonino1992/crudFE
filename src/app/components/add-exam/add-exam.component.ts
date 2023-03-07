import { Time } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseDto } from 'src/app/classes/courseDto';
import { ExamDto } from 'src/app/classes/examDto';
import { CourseService } from 'src/app/services/course/course.service';
import { ExamService } from 'src/app/services/exam/exam.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit{


   courseId: number;  
   examForm: FormGroup;
   course: CourseDto;
  
  constructor(private examService: ExamService,private courseService: CourseService, public dialogRef: MatDialogRef<AddExamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.courseId = data.courseId;
  }

  ngOnInit(): void {
    this.examForm = new FormGroup({
      date: new FormControl(null, Validators.required),
      time: new FormControl(null, Validators.required),
      room: new FormControl(null, Validators.required)
    })
    this.loadCourseById();
  }

  loadCourseById() {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (c) => {
        this.course = c;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Course not found');
        } else if (err.status === 500) {
          alert('Internal server error');
        }
      }
    })
  }

  onSubmit() {
    if (this.examForm.valid) {
      const examDto: ExamDto = {
        courseId: this.course.id,
        day: this.examForm.getRawValue().date,
        hour: this.examForm.getRawValue().time as Time,
        classroom: this.examForm.getRawValue().room,
        done: false
      };
      this.examService.addExam(examDto).subscribe({
        next: (exam) => {
          alert('Esame aggiunto con successo');
          this.course.done = true;
          this.courseService.updateCourse(this.course).subscribe({
            next: () => {
              this.dialogRef.close();
            },
            error: (err: HttpErrorResponse) => {
              alert('Errore nell\'aggiornamento del corso');
            }
          })
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            alert('Course not found');
          } else if (err.status === 500) {
            alert('Internal server error');
          }
        }
      })
    } else {
      alert('Compila tutti i campi');
    }
  }



  deleteAction() {
    this.dialogRef.close();
  }
}
