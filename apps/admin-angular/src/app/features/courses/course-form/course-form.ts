import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../../core/services/course.service';
import { UserService } from '../../../core/services/user.service';
import { UserModel } from '../../../shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  imports: [ReactiveFormsModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
})
export class CourseForm implements OnInit {
  private courseService = inject(CourseService);
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Cuando el formulario se usa dentro de un modal (admin) emite eventos
  // en lugar de navegar; el padre decide qué hacer.
  @Input() embedded = false;
  @Input() courseId: string | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;
  isEditMode = false;
  teachers: UserModel[] = [];
  submitting = false;
  errorMsg = '';

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      category: new FormControl('', [Validators.required]),
      teacher: new FormControl('', [Validators.required]),
      modality: new FormControl('Presencial', [Validators.required]),
      duration: new FormControl(0, [Validators.min(0), Validators.max(500)]),
      vacancies: new FormControl(0, [Validators.min(0), Validators.max(1000)]),
      price: new FormControl(0, [Validators.min(0)]),
      startDate: new FormControl('', [Validators.required]),
      isActive: new FormControl(true, [Validators.required]),
      description: new FormControl('', [Validators.maxLength(500)]),
    });

    this.loadTeachers();

    // El id puede venir por @Input (modal) o por la ruta (página /courses/new)
    const id = this.courseId ?? this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseId = id;
      this.isEditMode = true;
      this.courseService.getCourse(id).subscribe({
        next: (res: any) => {
          const course = res.data ?? res;
          this.form.patchValue({
            ...course,
            teacher: course.teacher?._id ?? course.teacher,
            startDate: course.startDate ? String(course.startDate).split('T')[0] : '',
          });
        },
      });
    }
  }

  private loadTeachers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.teachers = users.filter((u) => u.role === 'teacher');
      },
      error: (err) => console.error('No se pudieron cargar los docentes:', err),
    });
  }

  onSubmit(): void {
    if (this.form.invalid || this.submitting) return;

    this.submitting = true;
    this.errorMsg = '';

    const courseData = {
      ...this.form.value,
      startDate: new Date(this.form.value.startDate),
    };

    const request$ =
      this.isEditMode && this.courseId
        ? this.courseService.updateCourse(this.courseId, courseData)
        : this.courseService.createCourse(courseData);

    request$.subscribe({
      next: () => {
        this.submitting = false;
        this.onSuccess();
      },
      error: (err) => {
        this.submitting = false;
        this.errorMsg = err?.error?.message || 'No se pudo guardar el curso';
      },
    });
  }

  onCancel(): void {
    if (this.embedded) {
      this.cancelled.emit();
    } else {
      this.router.navigate(['/courses']);
    }
  }

  private onSuccess(): void {
    if (this.embedded) {
      this.saved.emit();
    } else {
      this.router.navigate(['/courses']);
    }
  }
}
