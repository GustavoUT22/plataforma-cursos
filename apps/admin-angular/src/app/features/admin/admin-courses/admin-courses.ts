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

  // Estado del modal de creación / edición
  formOpen = signal(false);
  editingCourseId = signal<string | null>(null);

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (res: any) => {
        const mapped = (res.data || []).map((course: any) => ({
          ...course,
          teacher: course.teacher?.name || course.teacher,
        }));
        this.courses.set(mapped);
      },
      error: (err) => {
        console.error('AdminCourses - Error:', err);
      },
    });
  }

  openCreate() {
    this.editingCourseId.set(null);
    this.formOpen.set(true);
  }

  openEdit(id: string) {
    this.editingCourseId.set(id);
    this.formOpen.set(true);
  }

  closeForm() {
    this.formOpen.set(false);
    this.editingCourseId.set(null);
  }

  onSaved() {
    this.closeForm();
    this.loadCourses();
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
