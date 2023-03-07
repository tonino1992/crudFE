import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CourseJoinTeacherDto } from 'src/app/classes/courseJoinTeacherDto';
import { JwtObject } from 'src/app/classes/jwtObject';
import { CourseService } from 'src/app/services/course/course.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { StudentCourseService } from 'src/app/services/student-course/student-course.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  dropdownSettings: IDropdownSettings;
  lista = [{}]
  selectedItemsSet: Set<string> = new Set();
  showConcludedCourses = false;
  courses: CourseJoinTeacherDto[] = [];
  jwt: JwtObject;
 

  constructor(private jwtService: JwtService, private courseService: CourseService,
    private studentCourseService: StudentCourseService) { }

  ngOnInit(): void {
    this.jwt = this.jwtService.decodeJwt();
    this.loadAllCourses();
    setTimeout(() => {
      this.generateDropdownList();
      this.setDropdown();
    }, 1000)

  }

  generateDropdownList() {
    let i = 0;
    const uniqueSubjects = Array.from(new Set(this.courses.map(course => course.subject)));
    const dropdownList = uniqueSubjects.map(subject => ({ id: i++, text: subject }));
    this.lista = dropdownList;   
  }
  

  setDropdown() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
  }

  onItemSelect(selectedItem: any) {
    this.selectedItemsSet.add(selectedItem.text);
    
  }
  
  onItemDeSelect(selectedItem: any) {
    this.selectedItemsSet.delete(selectedItem.text);
  }

  onSelectAll(items: any) {
    for (let item of items) {
      this.selectedItemsSet.add(item.text);
    }
  }
  
  onDeSelectAll(items: any) {
    this.selectedItemsSet.clear();
  }
  
  


  enrollStudentInCourse(courseId: number) {
    const studentCourseDto = { courseId: courseId, studentId: this.jwt.id }
    this.studentCourseService.enrollStudentInCourse(studentCourseDto).subscribe({
      next: (sc) => {
        alert('Adesso sei ufficialmente iscritto a questo corso!')
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          alert('Sei già iscritto a questo corso!');
        } else if (err.status === 404) {
          alert('Student not found');
        } else if (err.status === 400) {
          alert('Student not found');
        } else {
          alert('Internal server error');
        }
      }
    })
  }

  loadAllCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (c) => {
        this.courses = c;
      },
      error: (err: HttpErrorResponse) => {
        alert('Internal server error');
      }
    })
  }

}
