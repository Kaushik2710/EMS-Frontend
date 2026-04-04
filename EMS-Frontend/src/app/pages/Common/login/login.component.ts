import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VerifyEmailPopupComponent } from '../verify-email-popup/verify-email-popup.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  userData: any;
  constructor(
    private router: Router,
    private toast: ToastrService,
    private dialog: MatDialog
  ) {
    localStorage.clear();
  }
  ngOnInit(): void {
    this.authService.isAdminSubject.next(false);
    this.authService.isEmployeeSubject.next(false);
  }
  authService: AuthService = inject(AuthService);
  loginform = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,}$/
      ),
    ]),
  });
  get id(): FormControl {
    return this.loginform.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.loginform.get('password') as FormControl;
  }
  forgotPassword() {
    this.dialog.open(VerifyEmailPopupComponent, {
      width: '50%',
      enterAnimationDuration: '350ms',
      exitAnimationDuration: '350ms',
    });
  }

  submitLoginForm() {
    this.authService.loginEmployee(this.loginform.value).subscribe({
      next: (res) => {
        this.userData = res;
        if (this.userData.status) {
          if (this.userData.isactive) {
            localStorage.setItem('id', this.userData.email);
            localStorage.setItem('role', this.userData.role);
            this.authService.onLoggedIn();
            this.router.navigate(['/admin/admin-dashboard']);
            this.toast.success(
              'Loggedin Successfully',
              'Welcome ' + this.userData.fname.toUpperCase(),
              {
                timeOut: 3000,
                closeButton: true,
              }
            );
          } else {
            localStorage.setItem('id', this.userData.email);
            localStorage.setItem('role', this.userData.role);
            this.authService.onLoggedIn();
            this.router.navigate(['/employee/emp-dashboard']);
            this.toast.success(
              'Loggedin Successfully',
              'Welcome ' + this.userData.fname.toUpperCase(),
              {
                timeOut: 3000,
                closeButton: true,
              }
            );
          }
        } else {
          if (this.userData.message == 'Not Match') {
            this.toast.error('Invalid Credential', 'Verify Email or Password', {
              timeOut: 3000,
              closeButton: true,
            });
          }
          if (this.userData.message == 'Not Exist') {
            this.toast.error(
              'Register First Before login',
              "User Doesn't Exist",
              {
                timeOut: 3000,
                closeButton: true,
              }
            );
          }
        }
      },
      error: (err) => {
        this.toast.error('Register First Before login', "User Doesn't Exist", {
          timeOut: 3000,
          closeButton: true,
        });
      },
    });
  }
}
