import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles: string[] = route.data['roles'];
  const userRole = authService.getUserRole();

  if (
    !authService.isLoggedIn() ||
    !userRole ||
    !expectedRoles.includes(userRole)
  ) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
