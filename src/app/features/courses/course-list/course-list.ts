import { Component, inject, OnInit } from '@angular/core';
import { Course, CourseService } from '../../../core/services/course.service';

@Component({
  selector: 'app-course-list',
  imports: [],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  Courses: Course[] = [];
  private courseService = inject(CourseService);

  ngOnInit(): void {
      this.Courses = this.courseService.getCourses();
  }
}
