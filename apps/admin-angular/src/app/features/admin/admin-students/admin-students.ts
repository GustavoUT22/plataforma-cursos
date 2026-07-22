import { Component, inject, OnInit, signal } from '@angular/core';
import { UserModel } from '../../../shared/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { CourseService } from '../../../core/services/course.service';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-admin-students',
  imports: [NgClass, DatePipe],
  templateUrl: './admin-students.html',
  styleUrl: './admin-students.css',
})
export class AdminStudents implements OnInit {
  users = signal<UserModel[]>([]);
  courses = signal<any[]>([]);

  private userService = inject(UserService);
  private courseService = inject(CourseService);
  private enrollmentService = inject(EnrollmentService);

  // Estado del modal de inscripción
  enrollOpen = signal(false);
  selectedStudent = signal<UserModel | null>(null);
  selectedCourseId = signal<string>('');
  enrollSubmitting = signal(false);
  enrollError = signal('');
  enrollSuccess = signal('');

  get allActives() {
    return this.users().filter((user) => user.status === 'active').length;
  }
  get allPending() {
    return this.users().filter((user) => user.status === 'pending').length;
  }
  get allSuspended() {
    return this.users().filter((user) => user.status === 'suspended').length;
  }

  get allLenghtUsers() {
    return this.users().length;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        const students = data.filter((user) => user.role === 'student');
        this.users.set(students);
      },
      error: (error) => {
        console.log(`Error to get users`, error);
      },
    });

    this.courseService.getCourses().subscribe({
      next: (res: any) => this.courses.set(res.data || []),
      error: (err) => console.error('Error al cargar cursos:', err),
    });
  }

  openEnroll(student: UserModel) {
    this.selectedStudent.set(student);
    this.selectedCourseId.set('');
    this.enrollError.set('');
    this.enrollSuccess.set('');
    this.enrollOpen.set(true);
  }

  closeEnroll() {
    this.enrollOpen.set(false);
    this.selectedStudent.set(null);
  }

  onCourseChange(event: Event) {
    this.selectedCourseId.set((event.target as HTMLSelectElement).value);
  }

  submitEnroll() {
    const student = this.selectedStudent();
    const courseId = this.selectedCourseId();
    if (!student || !courseId || this.enrollSubmitting()) return;

    this.enrollSubmitting.set(true);
    this.enrollError.set('');
    this.enrollSuccess.set('');

    this.enrollmentService.enrollStudent(String(student._id), courseId).subscribe({
      next: () => {
        this.enrollSubmitting.set(false);
        this.enrollSuccess.set('Estudiante inscrito correctamente.');
      },
      error: (err) => {
        this.enrollSubmitting.set(false);
        this.enrollError.set(err?.error?.message || 'No se pudo inscribir al estudiante');
      },
    });
  }
}
