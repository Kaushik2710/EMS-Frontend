import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, DoCheck, Input, OnDestroy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { ShortnamePipe } from '../../../core/Pipe/shortname.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    TitleCasePipe,
    ShortnamePipe,
    MatTooltipModule,
  ],
})
export class SidebarComponent implements OnDestroy, DoCheck {
  userData: any;
  constructor(private router: Router) {}
  authService: AuthService = inject(AuthService);
  @Input() sideNavStatus: boolean = false;
  isAdmin: any;
  isEmployee: any;
  name: any;
  role: any;
  ngDoCheck(): void {
    this.authService.isAdminSubject.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.authService.isEmployeeSubject.subscribe((isEmployee) => {
      this.isEmployee = isEmployee;
    });
    this.authService.name.subscribe((name) => {
      this.name = name;
    });
    this.authService.role.subscribe((role) => {
      this.role = role;
    });
    if (this.router.url === '/login') {
      this.isAdmin = false;
      this.isEmployee = false;
    }
  }
  //Before Login
  beforeLoginList = [
    {
      number: 1,
      routerLink: '/login',
      name: 'Login',
      class: 'fa-solid fa-right-to-bracket',
    },
    {
      number: 2,
      routerLink: '/signup',
      name: 'Signup',
      class: 'fa-solid fa-user-plus',
    },
  ];
  //Admin Login
  Adminlist = [
    {
      number: 1,
      routerLink: '/admin/admin-dashboard',
      name: 'Dashboard',
      class: 'fa-solid fa-table-columns',
    },
    {
      number: 2,
      routerLink: '/admin/manage-department',
      name: 'Manage Department',
      class: 'fa-solid fa-people-roof',
    },
    {
      number: 3,
      routerLink: '/admin/add-staff',
      name: 'Add staff',
      class: 'fa-solid fa-people-group',
    },
    {
      number: 4,
      routerLink: '/admin/manage-staff',
      name: 'Manage staff',
      class: 'fa-solid fa-people-roof',
    },
    {
      number: 5,
      routerLink: '/admin/add-salary',
      name: 'Add salary',
      class: 'fa-solid fa-hand-holding-dollar',
    },
    {
      number: 6,
      routerLink: '/admin/manage-salary',
      name: 'Manage Salary',
      class: 'fa-solid fa-money-bill-transfer',
    },
    {
      number: 7,
      routerLink: '/admin/manage-leave',
      name: 'Manage Leave',
      class: 'fa-solid fa-person-walking-arrow-right',
    },
    {
      number: 8,
      routerLink: '/admin/leave-history',
      name: 'Leave History',
      class: 'fa-solid fa-clock-rotate-left',
    },
    {
      number: 9,
      routerLink: '/admin/manage-attendance',
      name: 'Manage Attendance',
      class: 'fa-solid fa-clipboard-user',
    },
    {
      number: 10,
      routerLink: '/admin/view-attendance',
      name: 'View Attendance',
      class: 'fa-solid fa-eye',
    },
    {
      number: 11,
      routerLink: '/admin/todo',
      name: 'To-Do List',
      class: 'fa-solid fa-clipboard-list',
    },
    {
      number: 12,
      routerLink: '/admin/update-profile',
      name: 'Update Profile',
      class: 'fa-solid fa-pen',
    },
  ];
  //Employee Login
  employeeList = [
    {
      number: 1,
      routerLink: '/employee/emp-dashboard',
      name: 'Dashboard',
      class: 'fa-solid fa-table-columns',
    },
    {
      number: 2,
      routerLink: '/employee/view-salary',
      name: 'Salary',
      class: 'fa-solid fa-hand-holding-dollar',
    },
    {
      number: 3,
      routerLink: '/employee/apply-leave',
      name: 'Apply Leave',
      class: 'fa-solid fa-person-walking-arrow-right',
    },
    {
      number: 4,
      routerLink: '/employee/leave-history',
      name: 'Leave History',
      class: 'fa-solid fa-clock-rotate-left',
    },
    {
      number: 5,
      routerLink: '/employee/todo',
      name: 'To-Do List',
      class: 'fa-solid fa-clipboard-list',
    },
    {
      number: 6,
      routerLink: '/employee/social',
      name: 'Links',
      class: 'fa-solid fa-photo-film',
    },
    {
      number: 7,
      routerLink: '/employee/update-profile',
      name: 'Update Profile',
      class: 'fa-solid fa-pen',
    },
  ];
  onIconClick(rou: string) {
    this.router.navigateByUrl(rou);
  }
  //User Profile
  logout() {
    if (this.isAdmin) {
      console.log('clicked in admin');
      this.authService.logOutAdmin();
      this.router.navigate(['login']);
    } else if (this.isEmployee) {
      console.log('clicked in employee');
      this.authService.logOutEmployee();
      this.router.navigate(['login']);
    }
  }
  ngOnDestroy(): void {
    this.authService.isAdminSubject.unsubscribe();
    this.authService.isEmployeeSubject.unsubscribe();
  }
}
