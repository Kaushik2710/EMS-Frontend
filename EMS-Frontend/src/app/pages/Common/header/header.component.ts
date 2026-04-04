import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  public authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  menuStatus: boolean = false;
  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  ngOnInit(): void {
    this.authService.isAdminSubject.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.authService.isEmployeeSubject.subscribe((isEmployee) => {
      this.isEmployee = isEmployee;
    });
  }
  logout() {
    if (this.isAdmin) {
      this.authService.logOutAdmin();
      this.router.navigate(['login']);
    } else if (this.isEmployee) {
      this.authService.logOutEmployee();
      this.router.navigate(['login']);
    }
  }
}
