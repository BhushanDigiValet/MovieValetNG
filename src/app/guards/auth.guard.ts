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
  const isLoggedIn = authService.isLoggedIn();

  const expectedRoles: string[] = route.data['roles'];
  const userRole = authService.getUserRole();

 if (isLoggedIn && state.url === '/login') {
   router.navigate(['/home']); 
   return false;
 }

 
 if (!isLoggedIn) {
   router.navigate(['/login']);
   return false;
 }


 if (!userRole || !expectedRoles.includes(userRole)) {
   router.navigate(['/home']); 
   return false;
 }
  return true;
};
