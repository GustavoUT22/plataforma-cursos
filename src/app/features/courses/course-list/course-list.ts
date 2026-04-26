import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../shared/models/course.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-course-list',
  imports: [DatePipe],
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
