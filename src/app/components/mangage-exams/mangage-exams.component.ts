import { Time } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamDto } from 'src/app/classes/examDto';
import { ExamJoinCourseDto } from 'src/app/classes/examJoinCourseDto';
import { ExamService } from 'src/app/services/exam/exam.service';

@Component({
  selector: 'app-mangage-exams',
  templateUrl: './mangage-exams.component.html',
  styleUrls: ['./mangage-exams.component.scss']
})
export class MangageExamsComponent {

  examForm: FormGroup;
  examId: number;
  exam: ExamJoinCourseDto;

  constructor(private examService: ExamService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.examForm = new FormGroup({
      date: new FormControl(null, Validators.required),
      time: new FormControl(null, Validators.required),
      room: new FormControl(null, Validators.required)
    })
    this.examId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.loadExamById(this.examId);
  }


  loadExamById(id: number) {
    this.examService.getExamById(id).subscribe({
      next: (e) => {
        this.exam = e;
        this.examForm.get('date')!.setValue(e.day);
        this.examForm.get('time')!.setValue(e.hour);
        this.examForm.get('room')!.setValue(e.classroom);        
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          alert('Esame non trovato')
        } else {
          alert('Internal server error')
        }
      }
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
        this.router.navigate(['app'])
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

  finishExam(){
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
        this.router.navigate(['app'])
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

  deleteAction(){
    this.router.navigate(['app'])
  }

}
