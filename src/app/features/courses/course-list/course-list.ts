import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../shared/models/course.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-course-list',
  imports: [DatePipe, RouterLink],
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
