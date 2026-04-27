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
      name: new FormControl(''),
      category: new FormControl(''),
      teacher: new FormControl(''),
      modality: new FormControl('Presencial'),
      duration: new FormControl(0),
      vacancies: new FormControl(0),
      price: new FormControl(0),
      startDate: new FormControl(''),
      isActive: new FormControl(true),
      description: new FormControl(''),
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
