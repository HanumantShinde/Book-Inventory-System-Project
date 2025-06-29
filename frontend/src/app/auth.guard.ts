import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
  const isLoggedIn = this.authService.isLoggedIn();
  const userRole = this.authService.getUserRole();
  const requiredRoles = route.data['roles'] as Array<string>;

  if (!isLoggedIn) {
    return this.router.parseUrl('/unauthorized');
  }

  // 👇 Fix: check if userRole is null
  if (!userRole || (requiredRoles && !requiredRoles.includes(userRole))) {
    return this.router.parseUrl('/unauthorized');
  }

  return true;
}
}

