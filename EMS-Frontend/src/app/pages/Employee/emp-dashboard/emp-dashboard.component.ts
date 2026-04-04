import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
import { AuthService } from '../../../core/service/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { LeaveService } from '../../../core/service/leave.service';
import { Chart, registerables } from 'chart.js';
import { AttendanceService } from '../../../core/service/attendance.service';
import { FormsModule } from '@angular/forms';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);

@Component({
  selector: 'app-emp-dashboard',
  standalone: true,
  imports: [RouterLink, DatePipe, CurrencyPipe, FormsModule],
  templateUrl: './emp-dashboard.component.html',
  styleUrl: './emp-dashboard.component.css',
})
export class EmpDashboardComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  linkService: ManageStaffService = inject(ManageStaffService);
  leaveService: LeaveService = inject(LeaveService);
  attendanceService: AttendanceService = inject(AttendanceService);
  sanitizer: DomSanitizer = inject(DomSanitizer);
  userEmail: any;
  userData: any;
  linkData: any;
  leaveData: any;
  chart: any;
  labels: any;
  backColor: any;
  attendanceData: any;
  selectedMonth: any = new Date().getMonth() + 1;
  presentCount: any;
  absentCount: any;
  halfDayCount: any;
  dataArray: any;
  ngOnInit(): void {
    this.userEmail = localStorage.getItem('id');
    this.authService.getUserByEmail(this.userEmail).subscribe((res) => {
      this.userData = res;
    });
    this.linkService.getLinks(this.userEmail).subscribe({
      next: (res) => {
        this.linkData = res;
      },
      error: (err) => {
        this.linkData = null;
      },
    });
    this.leaveService
      .getLeaveRequestsOfEmployee(this.userEmail)
      .subscribe((res) => {
        this.leaveData = res;
      });
    this.loadAttendanceData(this.selectedMonth);
  }
  loadAttendanceData(month: any) {
    this.attendanceService
      .getAttendanceOfMonth(
        this.userEmail,
        this.selectedMonth,
        new Date().getFullYear()
      )
      .subscribe((data) => {
        this.attendanceData = data;
        if (
          this.attendanceData.presentCount != null &&
          this.attendanceData.absentCount != null &&
          this.attendanceData.halfDayCount != null
        ) {
          this.presentCount = this.attendanceData.presentCount;
          this.absentCount = this.attendanceData.absentCount;
          this.halfDayCount = this.attendanceData.halfDayCount;
        } else {
          this.presentCount = 1;
          this.absentCount = 1;
          this.halfDayCount = 1;
        }

        this.renderChart(
          this.presentCount,
          this.absentCount,
          this.halfDayCount
        );
      });
  }
  changeMonth() {
    this.loadAttendanceData(this.selectedMonth);
  }
  getImageUrl(element: any): SafeUrl {
    if (element) {
      const typeMatch = element.image.match(/^data:(image\/[a-z]+);base64,/i);

      if (typeMatch && typeMatch.length > 1) {
        const imageType = typeMatch[1];
        return this.sanitizer.bypassSecurityTrustUrl(
          'data:' + imageType + ';base64,' + element.image
        );
      } else {
        return this.sanitizer.bypassSecurityTrustUrl(
          'data:image/png;base64,' + element.image
        );
      }
    }
    return '';
  }
  renderChart(presentCount: number, absentCount: number, halfDayCount: number) {
    if (absentCount == 0 && halfDayCount != 0) {
      this.labels = ['Present', 'Half Day'];
      this.backColor = ['green', 'blue'];
      this.dataArray = [presentCount, halfDayCount];
    } else if (halfDayCount == 0 && absentCount != 0) {
      this.labels = ['Present', 'Absent'];
      this.backColor = ['green', 'red'];
      this.dataArray = [presentCount, absentCount];
    } else if (halfDayCount == 0 && absentCount == 0) {
      this.labels = ['Present'];
      this.backColor = ['green'];
      this.dataArray = [presentCount];
    } else {
      this.labels = ['Present', 'Absent', 'Half Day'];
      this.backColor = ['green', 'red', 'blue'];
      this.dataArray = [presentCount, absentCount, halfDayCount];
    }
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Attendance',
            backgroundColor: this.backColor,

            data: this.dataArray,
            borderWidth: 2,
            hoverOffset: 4,
            hoverBorderColor: 'grey',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              color: 'rgb(255, 99, 132)',
              borderRadius: 0,
            },
          },
          datalabels: {
            color: 'black',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size: 15,
                },
              },
            },
          },
        },

        responsive: true,
        maintainAspectRatio: false,
      },
      plugins: [ChartDataLabels],
    });
  }
}
