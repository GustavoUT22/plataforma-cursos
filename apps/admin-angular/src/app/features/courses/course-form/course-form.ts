import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../../core/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  imports: [ReactiveFormsModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
})
export class CourseForm implements OnInit {
  private courseService = inject(CourseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  form!: FormGroup;
  isEditMode = false;
  courseId: string | null = null;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      category: new FormControl('', [Validators.required]),
      teacher: new FormControl('', [Validators.required, Validators.minLength(2)]),
      modality: new FormControl('Presencial', [Validators.required]),
      duration: new FormControl(0, [Validators.min(0), Validators.max(500)]),
      vacancies: new FormControl(0, [Validators.min(0), Validators.max(1000)]),
      price: new FormControl(0, [Validators.min(0)]),
      startDate: new FormControl('', [Validators.required]),
      isActive: new FormControl(true, [Validators.required]),
      description: new FormControl('', [Validators.maxLength(500)]),
    });

    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.isEditMode = true;
      this.courseService.getCourse(this.courseId).subscribe({
        next: (course) => {
          this.form.patchValue({
            ...course,
            startDate: course.startDate instanceof Date 
              ? course.startDate.toISOString().split('T')[0]
              : course.startDate,
          });
        },
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const courseData = {
      ...this.form.value,
      startDate: new Date(this.form.value.startDate),
    };

    if (this.isEditMode && this.courseId) {
      this.courseService.updateCourse(this.courseId, courseData).subscribe({
        next: () => {
          this.router.navigate(['/courses']);
        },
      });
    } else {
      this.courseService.createCourse(courseData).subscribe({
        next: () => {
          this.router.navigate(['/courses']);
        },
      });
    }
  }
}