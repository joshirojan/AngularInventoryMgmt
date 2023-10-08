import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuardGuard: CanActivateFn = () => {
  const jwtToken = localStorage.getItem('jwtToken');
  const router = inject(Router);
  if (jwtToken) {
    return router.navigate(['home']);
  } else {
    return true;
  }
};
