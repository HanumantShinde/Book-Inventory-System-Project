import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const librarianGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = localStorage.getItem('userRole');

  if (role === 'LIBRARIAN') {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};


