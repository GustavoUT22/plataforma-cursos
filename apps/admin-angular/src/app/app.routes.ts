import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { CourseList } from './features/courses/course-list/course-list';
import { CourseDetail } from './features/courses/course-detail/course-detail';
import { CourseForm } from './features/courses/course-form/course-form';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { AdminLayout } from './features/admin/admin-layout/admin-layout';
import { AdminCourses } from './features/admin/admin-courses/admin-courses';
import { AdminStudents } from './features/admin/admin-students/admin-students';
import { AdminTeachers } from './features/admin/admin-teachers/admin-teachers';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: '',
    component: Home,
    canActivate: [authGuard],
  },
  {
    path: 'courses',
    component: CourseList,
    canActivate: [authGuard],
  },
  {
    path: 'courses/new',
    component: CourseForm,
    canActivate: [authGuard],
  },
  {
    path: 'courses/:id',
    component: CourseDetail,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard, roleGuard],
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
    redirectTo: 'login',
  },
];
