import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExamJoinCourseDto } from 'src/app/classes/examJoinCourseDto';
import { StudentExamDto } from 'src/app/classes/studentExamDto';
import { StudentExamService } from 'src/app/services/student-exam/student-exam.service';
import { ManageExamsComponent } from '../mangage-exams/mangage-exams.component';

@Component({
  selector: 'app-vote-exam',
  templateUrl: './vote-exam.component.html',
  styleUrls: ['./vote-exam.component.scss']
})
export class VoteExamComponent {

  @Input() exam: ExamJoinCourseDto;
  courseName: string;
  studentExams: StudentExamDto[];

  constructor(private studentExamService: StudentExamService, public dialogRef: MatDialogRef<ManageExamsComponent>) { }

  ngOnInit(): void {
    this.loadStudentExamsByExamId();
  }

  loadStudentExamsByExamId() {
    this.studentExamService.getStudentExamsByExam(this.exam.id).subscribe({
      next: (se) => {
        this.studentExams = se;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Exam not found');
        } else if (err.status === 500) {
          alert('Internal server error');
        }
      }
    })
  }

  assignGrade(studentExam: StudentExamDto): void {
    let voteStr = prompt('Inserisci il voto per lo studente ' + studentExam.studentName + ' ' + studentExam.studentSurname + ':');
    let vote = parseInt(voteStr!);
    if (isNaN(vote) || vote < 1 || vote > 30) {
      alert('Il voto deve essere un numero compreso tra 1 e 30');
      return;
    }
    studentExam.vote = vote;
    this.studentExamService.updateStudentExam(studentExam).subscribe({
      next: () => {
        alert('Voto assegnato con successo');
        this.loadStudentExamsByExamId();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Studente non trovato');
        } else if (err.status === 400) {
          alert('Esame non trovato')
        } else if (err.status === 409) {
          alert('Lo studente non è iscritto a questo esame')
        } else if (err.status === 500) {
          alert('Errore interno del server');
        }
      }
    });
  }



}
