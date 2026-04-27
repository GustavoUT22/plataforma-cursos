import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { CourseList } from './features/courses/course-list/course-list';
import { CourseDetail } from './features/courses/course-detail/course-detail';
import { CourseForm } from './features/courses/course-form/course-form';

// definimos rutas de la aplicación
/**
 * Home -> Donde se verán todos los cursos, crear nuevos cursos y eliminar cursos.
 * Detalle curso -> Donde se verá el detalle de un curso y poder editarlo.
 */
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
    path: '**',
    redirectTo: '',
  },
];
