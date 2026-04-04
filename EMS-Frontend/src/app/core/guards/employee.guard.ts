import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

export const employeeGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastrService);

  if (authService.isLoggedIn() && localStorage.getItem('role') === 'employee') {
    return true;
  } else {
    toast.warning('Invalid Credential', 'Access Denied', {
      timeOut: 3000,
      closeButton: true,
    });
    router.navigate(['login']);
    return false;
  }
};
