import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-enrollments',
  imports: [DatePipe, RouterLink],
  templateUrl: './admin-enrollments.html',
  styleUrl: './admin-enrollments.css',
})
export class AdminEnrollments implements OnInit {
  enrollments = signal<any[]>([]);
  loading = signal(true);
  errorMessage = signal('');
  activeTab = signal<'all' | 'student' | 'course'>('all');

  private enrollmentService = inject(EnrollmentService);

  countAll = computed(() => this.enrollments().length);
  countStudents = computed(() => {
    const unique = new Set(this.enrollments().map((e) => e.studentId?._id));
    return unique.size;
  });
  countCourses = computed(() => {
    const unique = new Set(this.enrollments().map((e) => e.courseId?._id));
    return unique.size;
  });

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.enrollmentService.getAllEnrollments().subscribe({
      next: (res: any) => {
        const data = res.data || [];
        this.enrollments.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar inscripciones:', err);
        this.loading.set(false);
        this.errorMessage.set('Error al cargar las inscripciones. Intenta de nuevo más tarde.');
      },
    });
  }

  deleteEnrollment(id: string) {
    if (confirm('¿Estás seguro de eliminar esta inscripción?')) {
      this.enrollmentService.deleteEnrollment(id).subscribe({
        next: () => {
          this.loadEnrollments();
        },
        error: (err) => {
          console.error('Error al eliminar inscripción:', err);
          this.errorMessage.set('Error al eliminar la inscripción. Intenta de nuevo.');
        },
      });
    }
  }

  setTab(tab: 'all' | 'student' | 'course') {
    this.activeTab.set(tab);
  }

  getInitials(name: string): string {
    if (!name) return '??';
    return name
      .split(' ')
      .map((p) => p.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }

  getGradient(name: string): string {
    const gradients = [
      'linear-gradient(135deg,#1a1a2e,#7c3aed)',
      'linear-gradient(135deg,#064e3b,#059669)',
      'linear-gradient(135deg,#1e3a5f,#2563eb)',
      'linear-gradient(135deg,#7c3aed,#ec4899)',
      'linear-gradient(135deg,#b91c1c,#f59e0b)',
      'linear-gradient(135deg,#0f766e,#14b8a6)',
      'linear-gradient(135deg,#92400e,#d97706)',
      'linear-gradient(135deg,#6d28d9,#a78bfa)',
    ];
    let hash = 0;
    const lower = name?.toLowerCase() || '';
    for (let i = 0; i < lower.length; i++) {
      hash = lower.charCodeAt(i) + ((hash << 5) - hash);
    }
    return gradients[Math.abs(hash) % gradients.length];
  }
}