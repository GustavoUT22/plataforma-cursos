import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLogged = localStorage.getItem('token');
  const router = inject(Router);

  return isLogged ? true : router.navigate(['/login']);
};
