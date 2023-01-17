export class StudentExamDto {
    bookingDate: Date;
    vote: number;
    studentId: number;
    examId: number;

    constructor(bookingDate: Date, vote: number, studentId: number, examId: number) {
        this.bookingDate = bookingDate;
        this.vote = vote;
        this.studentId = studentId;
        this.examId = examId;
    }
}