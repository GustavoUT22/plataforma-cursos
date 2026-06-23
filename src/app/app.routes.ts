import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { CourseList } from './features/courses/course-list/course-list';
import { CourseDetail } from './features/courses/course-detail/course-detail';
import { CourseForm } from './features/courses/course-form/course-form';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { AdminLayout } from './features/admin/admin-layout/admin-layout';
import { AdminCourses } from './features/admin/admin-courses/admin-courses';
import { AdminStudents } from './features/admin/admin-students/admin-students';
import { AdminTeachers } from './features/admin/admin-teachers/admin-teachers';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'courses',
    component: CourseList,
  },
  {
    path: 'courses/new',
    component: CourseForm,
  },
  {
    path: 'courses/:id',
    component: CourseDetail,
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'courses', component: AdminCourses },
      { path: 'students', component: AdminStudents },
      { path: 'teachers', component: AdminTeachers },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
