import { Time } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExamDto } from 'src/app/classes/examDto';
import { ExamJoinCourseDto } from 'src/app/classes/examJoinCourseDto';
import { ExamService } from 'src/app/services/exam/exam.service';
import { ManageExamsComponent } from '../mangage-exams/mangage-exams.component';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.scss']
})
export class ExamDetailsComponent {

  examForm: FormGroup;
  @Input() exam: ExamJoinCourseDto;

  constructor(private examService: ExamService, public dialogRef: MatDialogRef<ManageExamsComponent>) { }

  ngOnInit() {
    this.examForm = new FormGroup({
      date: new FormControl(this.exam.day, Validators.required),
      time: new FormControl(this.exam.hour, Validators.required),
      room: new FormControl(this.exam.classroom, Validators.required)
    })
  }


  onSubmit() {
    const examDto: ExamDto = {
      id: this.exam.id,
      done: this.exam.done,
      courseId: this.exam.courseId,
      day: this.examForm.get('date')!.value, //recupera il valore del campo data del form
      hour: this.examForm.get('time')!.value as Time, //recupera il valore del campo ora del form e casta a tipo Time
      classroom: this.examForm.get('room')!.value //recupera il valore del campo aula del form
    };
    console.log(examDto);
    // Invia l'oggetto examDto al servizio examService per aggiornare l'esame
    this.examService.updateExam(examDto).subscribe({
      next: () => {
        alert('Esame aggiornato con successo');
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Esame non trovato')
        } else {
          alert('Internal server error')
        }
      }
    });
  }

  finishExam() {
    const examDto: ExamDto = {
      id: this.exam.id,
      done: true,
      courseId: this.exam.courseId,
      day: this.examForm.get('date')!.value, //recupera il valore del campo data del form
      hour: this.examForm.get('time')!.value as Time, //recupera il valore del campo ora del form e casta a tipo Time
      classroom: this.examForm.get('room')!.value //recupera il valore del campo aula del form
    };
    console.log(examDto);
    // Invia l'oggetto examDto al servizio examService per aggiornare l'esame
    this.examService.updateExam(examDto).subscribe({
      next: () => {
        alert('Esame aggiornato con successo');
        this.dialogRef.close();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Esame non trovato')
        } else {
          alert('Internal server error')
        }
      }
    });

  }

  deleteAction() {
    this.dialogRef.close();
  }

}
