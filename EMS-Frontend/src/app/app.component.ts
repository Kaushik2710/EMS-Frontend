import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/Common/header/header.component';
import { SidebarComponent } from './pages/Common/sidebar/sidebar.component';
import { NgClass } from '@angular/common';
import { LoginComponent } from './pages/Common/login/login.component';
import { SignupComponent } from './pages/Common/signup/signup.component';
import { AdminDashboardComponent } from './pages/Admin/admin-dashboard/admin-dashboard.component';
import { EmpDashboardComponent } from './pages/Employee/emp-dashboard/emp-dashboard.component';
import { NotfoundComponent } from './pages/Common/notfound/notfound.component';
import { AuthService } from './core/service/auth.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    NgClass,
    LoginComponent,
    SignupComponent,
    AdminDashboardComponent,
    EmpDashboardComponent,
    NotfoundComponent,
    MatDialogModule,
  ],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  constructor() {}
  ngOnDestroy(): void {
    localStorage.clear();
  }
  title = 'ems';
  sideNavStatus: boolean = false;
}
