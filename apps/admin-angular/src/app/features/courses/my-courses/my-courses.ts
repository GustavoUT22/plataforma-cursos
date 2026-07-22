import { Component, inject, OnInit, signal } from '@angular/core';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  imports: [DatePipe, RouterLink],
  templateUrl: './my-courses.html',
  styleUrl: './my-courses.css',
})
export class MyCourses implements OnInit {
  enrollments = signal<any[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  private enrollmentService = inject(EnrollmentService);

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.enrollmentService.getMyEnrollments().subscribe({
      next: (res: any) => {
        const data = res.data || [];
        this.enrollments.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar inscripciones:', err);
        this.loading.set(false);
        if (err.status === 403) {
          this.errorMessage.set('Solo los estudiantes pueden ver sus cursos inscritos.');
        } else {
          this.errorMessage.set('Error al cargar tus cursos. Intenta de nuevo más tarde.');
        }
      },
    });
  }

  cancelEnrollment(id: string) {
    if (confirm('¿Estás seguro de cancelar esta inscripción?')) {
      this.enrollmentService.deleteMyEnrollment(id).subscribe({
        next: () => {
          this.loadEnrollments();
        },
        error: (err) => {
          console.error('Error al cancelar inscripción:', err);
          this.errorMessage.set('Error al cancelar la inscripción. Intenta de nuevo.');
        },
      });
    }
  }
}