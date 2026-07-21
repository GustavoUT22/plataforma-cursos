import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../../core/services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  imports: [ReactiveFormsModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
})
export class CourseForm implements OnInit {
  private courseService = inject(CourseService);
  private router = inject(Router);
  form!: FormGroup;

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
  }

  onSubmit() {
    const courses = this.courseService.getCourses();
    const newId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;

    const newCourse = {
      id: newId,
      ...this.form.value,
      startDate: new Date(this.form.value.startDate),
    };

    console.log(newCourse);
    this.courseService.createCourse(newCourse);

    this.router.navigate(['/courses']);
  }
}
