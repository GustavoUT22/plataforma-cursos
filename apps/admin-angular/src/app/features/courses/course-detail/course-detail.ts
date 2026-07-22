import { Component, inject, OnInit, signal } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-course-detail',
  imports: [DatePipe],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit{
  course = signal<any>(null);
  enrolling = signal(false);
  enrolled = signal(false);
  message = signal('');

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private enrollmentService = inject(EnrollmentService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.courseService.getCourse(id).subscribe({
          next: (res: any) => {
            const courseData = res.data || res;
            this.course.set({
              ...courseData,
              teacher: courseData.teacher?.name || courseData.teacher,
              startDate: courseData.startDate || null,
            });
          },
          error: (err) => {
            console.error('CourseDetail - Error:', err);
          },
        });
      }
    });
  }

  get isStudent(): boolean {
    return this.authService.getRole() === 'student';
  }

  enroll() {
    const courseId = this.course()?._id;
    if (!courseId) return;

    this.enrolling.set(true);
    this.message.set('');

    this.enrollmentService.enroll(courseId).subscribe({
      next: () => {
        this.enrolled.set(true);
        this.enrolling.set(false);
        this.message.set('¡Inscripción exitosa!');
      },
      error: (err) => {
        this.enrolling.set(false);
        if (err.status === 400) {
          this.enrolled.set(true);
          this.message.set('Ya estás inscrito en este curso');
        } else {
          this.message.set('Error al inscribirte. Intenta de nuevo.');
        }
      },
    });
  }
}