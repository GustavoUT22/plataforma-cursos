import { Component, inject, OnInit } from '@angular/core';
import { Course } from '../../../shared/models/course.model';
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
  course!: Course;
  private route = inject(ActivatedRoute)
  private courseService = inject(CourseService);

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.course = this.courseService.getCourse(Number(id))
  }
}
