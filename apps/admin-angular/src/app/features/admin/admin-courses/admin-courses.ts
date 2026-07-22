import { Component, inject, OnInit, signal } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { CourseForm } from '../../courses/course-form/course-form';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-courses',
  imports: [CourseForm, RouterLink],
  templateUrl: './admin-courses.html',
  styleUrl: './admin-courses.css',
})
export class AdminCourses implements OnInit {
  courses = signal<any[]>([]);
  private courseService = inject(CourseService);

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (res: any) => {
        console.log('AdminCourses - Respuesta:', res);
        const mapped = (res.data || []).map((course: any) => ({
          ...course,
          teacher: course.teacher?.name || course.teacher
        }));
        this.courses.set(mapped);
      },
      error: (err) => {
        console.error('AdminCourses - Error:', err);
      },
    });
  }

  showForm = false;
  toggleform() {
    this.showForm = !this.showForm;
  }

  deleteCourse(id: string) {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          this.loadCourses();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
        },
      });
    }
  }
}