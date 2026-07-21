import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../shared/models/course.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  courses = signal<Course[]>([]);
  private courseService = inject(CourseService);

  ngOnInit(): void {
    const allCourses = this.courseService.getCourses();
    this.courses.set(allCourses.slice(0, 6));
  }
}
