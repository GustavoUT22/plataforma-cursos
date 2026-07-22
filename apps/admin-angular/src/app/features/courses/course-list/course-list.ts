import { Component, inject, OnInit, signal } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-course-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses = signal<any[]>([]);
  private courseService = inject(CourseService);

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (res: any) => {
        console.log('CourseList - Respuesta:', res);
        const mapped = (res.data || []).map((course: any) => ({
          ...course,
          teacher: course.teacher?.name || course.teacher
        }));
        this.courses.set(mapped);
      },
      error: (err) => {
        console.error('CourseList - Error:', err);
      },
    });
  }
}