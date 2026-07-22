import { Component, inject, OnInit, signal } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-course-detail',
  imports: [DatePipe],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit{
  course = signal<any>(null);
  private route = inject(ActivatedRoute)
  private courseService = inject(CourseService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('CourseDetail - ID recibido:', id);
      if (id) {
        this.courseService.getCourse(id).subscribe({
          next: (res: any) => {
            console.log('CourseDetail - Respuesta completa:', res);
            const courseData = res.data || res;
            const processed = {
              ...courseData,
              teacher: courseData.teacher?.name || courseData.teacher,
              startDate: courseData.startDate || null,
            };
            console.log('CourseDetail - Curso procesado:', processed);
            this.course.set(processed);
          },
          error: (err) => {
            console.error('CourseDetail - Error:', err);
          },
        });
      } else {
        console.error('CourseDetail - No se recibió ID');
      }
    });
  }
}