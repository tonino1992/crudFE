export class CourseJoinTeacherDto {
    id: number;
    subject: string;
    hourAmount: number;
    teacherId: number;
    teacherName: string;
    teacherSurname: string;

    constructor(id: number, subject: string, hourAmount: number, teacherId: number, teacherName: string, teacherSurname: string) {
        this.id = id;
        this.subject = subject;
        this.hourAmount = hourAmount;
        this.teacherId = teacherId;
        this.teacherName = teacherName;
        this.teacherSurname = teacherSurname;
    }
    
}
