import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { AttendanceService } from '../../../core/service/attendance.service';
import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
Chart.register(...registerables);
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-attendance-popup',
  standalone: true,
  imports: [MatDialogModule, FormsModule, MatButtonModule],
  templateUrl: './attendance-popup.component.html',
  styleUrl: './attendance-popup.component.css',
})
export class AttendancePopupComponent implements OnInit {
  attendanceService: AttendanceService = inject(AttendanceService);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AttendancePopupComponent>,
    private dialog: MatDialog
  ) {}
  presentCount: any;
  absentCount: any;
  halfDayCount: any;
  userData: any;
  attendanceData: any;
  chart: any;
  dataArray: any;
  labels: any;
  backColor: any;
  selectedMonth: any = new Date().getMonth() + 1;
  selectedYear: any = new Date().getFullYear();
  ngOnInit(): void {
    this.userData = this.data;
    this.loadAttendanceData(this.selectedMonth, this.selectedYear);
  }
  loadAttendanceData(month: any, year: any) {
    this.attendanceService
      .getAttendanceOfMonth(this.userData.data.register.email, month, year)
      .subscribe((res) => {
        this.attendanceData = res;
        // console.log(this.attendanceData);
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
    this.loadAttendanceData(this.selectedMonth, this.selectedYear);
  }
  changeYear() {
    this.loadAttendanceData(this.selectedMonth, this.selectedYear);
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
