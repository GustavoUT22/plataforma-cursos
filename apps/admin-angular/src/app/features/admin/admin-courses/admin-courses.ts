import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../shared/models/course.model';
import { CourseForm } from '../../courses/course-form/course-form';

@Component({
  selector: 'app-admin-courses',
  imports: [CourseForm],
  templateUrl: './admin-courses.html',
  styleUrl: './admin-courses.css',
})
export class AdminCourses implements OnInit {
  courses: Course[] = [];
  private courseService = inject(CourseService);

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
  }

  showForm = false;
  toggleform() {
    this.showForm = !this.showForm;
  }
}
