import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (!token) {
    return router.navigate(['/login']);
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role === 'admin') {
      return true;
    }
  } catch {
    return router.navigate(['/']);
  }

  return router.navigate(['/']);
};
