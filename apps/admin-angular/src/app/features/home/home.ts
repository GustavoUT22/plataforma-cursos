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
  courses = signal<any[]>([]);
  private courseService = inject(CourseService);

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (res: any) => {
        console.log('Home - Respuesta completa:', res);
        const allCourses = res.data || [];
        this.courses.set(allCourses.slice(0, 6));
      },
      error: (err) => {
        console.error('Home - Error al cargar cursos:', err);
      },
    });
  }
}