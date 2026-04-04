import { Routes } from '@angular/router';
import { LoginComponent } from './pages/Common/login/login.component';

import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { employeeGuard } from './core/guards/employee.guard';
import { candeactivateGuard } from './core/guards/candeactivate.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    title: 'Signup',
    canDeactivate: [candeactivateGuard],
    loadComponent: () =>
      import('./pages/Common/signup/signup.component').then(
        (mod) => mod.SignupComponent
      ),
  },
  {
    path: 'admin',
    title: 'Admin',
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: 'admin-dashboard',
        title: 'Dashboard',
        loadComponent: () =>
          import(
            './pages/Admin/admin-dashboard/admin-dashboard.component'
          ).then((mod) => mod.AdminDashboardComponent),
      },
      {
        path: 'manage-department',
        title: 'Manage Department',
        loadComponent: () =>
          import(
            './pages/Admin/manage-department/manage-department.component'
          ).then((mod) => mod.ManageDepartmentComponent),
      },
      {
        path: 'add-staff',
        title: 'Add Staff',
        canDeactivate: [candeactivateGuard],
        loadComponent: () =>
          import('./pages/Admin/add-staff/add-staff.component').then(
            (mod) => mod.AddStaffComponent
          ),
      },
      {
        path: 'manage-staff',
        title: 'Manage Staff',
        loadComponent: () =>
          import('./pages/Admin/manage-staff/manage-staff.component').then(
            (mod) => mod.ManageStaffComponent
          ),
      },
      {
        path: 'add-salary',
        title: 'Add Salary',
        loadComponent: () =>
          import('./pages/Admin/add-salary/add-salary.component').then(
            (mod) => mod.AddSalaryComponent
          ),
      },
      {
        path: 'manage-salary',
        title: 'Manage Salary',
        loadComponent: () =>
          import('./pages/Admin/manage-salary/manage-salary.component').then(
            (mod) => mod.ManageSalaryComponent
          ),
      },
      {
        path: 'manage-leave',
        title: 'Manage Leave',
        loadComponent: () =>
          import('./pages/Admin/manage-leave/manage-leave.component').then(
            (mod) => mod.ManageLeaveComponent
          ),
      },
      {
        path: 'leave-history',
        title: 'History',
        loadComponent: () =>
          import('./pages/Admin/leave-history/leave-history.component').then(
            (mod) => mod.LeaveHistoryComponent
          ),
      },
      {
        path: 'manage-attendance',
        title: 'Attendance',
        loadComponent: () =>
          import(
            './pages/Admin/manage-attendance/manage-attendance.component'
          ).then((mod) => mod.ManageAttendanceComponent),
      },
      {
        path: 'view-attendance',
        title: 'Attendance',
        loadComponent: () =>
          import(
            './pages/Admin/view-attendance/view-attendance.component'
          ).then((mod) => mod.ViewAttendanceComponent),
      },
      {
        path: 'todo',
        title: 'Todo',
        loadComponent: () =>
          import('./pages/Common/todo/todo.component').then(
            (mod) => mod.TodoComponent
          ),
      },
      {
        path: 'update-profile',
        title: 'Update',
        canDeactivate: [candeactivateGuard],
        loadComponent: () =>
          import(
            './pages/Employee/update-profile/update-profile.component'
          ).then((mod) => mod.UpdateProfileComponent),
      },
    ],
  },
  {
    path: 'employee',
    title: 'Employee',
    canActivate: [authGuard, employeeGuard],
    children: [
      {
        path: 'emp-dashboard',
        title: 'Dashboard',
        loadComponent: () =>
          import('./pages/Employee/emp-dashboard/emp-dashboard.component').then(
            (mod) => mod.EmpDashboardComponent
          ),
      },
      {
        path: 'view-salary',
        title: 'Salary',
        loadComponent: () =>
          import('./pages/Employee/view-salary/view-salary.component').then(
            (mod) => mod.ViewSalaryComponent
          ),
      },
      {
        path: 'apply-leave',
        title: 'Apply Leave',
        loadComponent: () =>
          import('./pages/Employee/apply-leave/apply-leave.component').then(
            (mod) => mod.ApplyLeaveComponent
          ),
      },
      {
        path: 'leave-history',
        title: 'History',
        loadComponent: () =>
          import(
            './pages/Employee/employee-leave-history/employee-leave-history.component'
          ).then((mod) => mod.EmployeeLeaveHistoryComponent),
      },
      {
        path: 'todo',
        title: 'Todo',
        loadComponent: () =>
          import('./pages/Common/todo/todo.component').then(
            (mod) => mod.TodoComponent
          ),
      },
      {
        path: 'update-profile',
        title: 'Update',
        canDeactivate: [candeactivateGuard],
        loadComponent: () =>
          import(
            './pages/Employee/update-profile/update-profile.component'
          ).then((mod) => mod.UpdateProfileComponent),
      },
      {
        path: 'social',
        title: 'Social',
        loadComponent: () =>
          import('./pages/Employee/social/social.component').then(
            (mod) => mod.SocialComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/Common/notfound/notfound.component').then(
        (mod) => mod.NotfoundComponent
      ),
  },
];
