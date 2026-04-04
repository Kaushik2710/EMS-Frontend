import { Component, OnInit, inject } from '@angular/core';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { CurrencyPipe } from '@angular/common';
import { LeaveService } from '../../../core/service/leave.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables);
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  allDept: ManageStaffService = inject(ManageStaffService);
  leaveService: LeaveService = inject(LeaveService);
  leaveRequest!: any;
  totalDept: any;
  totalStaff: any;
  deptData: any;
  staffData: any;
  totalSalary: number = 0;
  deptArray: String[] = [];
  staffCount: number[] = [];
  deptSalary: number[] = [];
  departmentStaffCount: any[] = [];
  deptStaffColor: any[] = [];
  deptSalaryColor: any[] = [];
  departmentSalaryCount: any = {};
  salaryData: any[] = [];
  chartType!: string;
  myChart: any;
  salaryChartType!: string;
  mySalaryChart: any;
  constructor() {
    this.chartType = 'pie'; // Default chart type
    this.salaryChartType = 'pie';
  }
  ngOnInit(): void {
    this.allDept.getAllDepartment().subscribe((res) => {
      this.deptData = res;
      this.totalDept = this.deptData.length;
    });
    this.allDept.getAllUsers().subscribe((res) => {
      this.staffData = res;
      this.totalStaff = this.staffData.length;
      if (this.staffData != null) {
        for (let emp of this.staffData) {
          this.totalSalary += emp.salary;
          let dept = emp.department;
          if (this.departmentStaffCount[dept]) {
            this.departmentStaffCount[dept]++;
          } else {
            this.departmentStaffCount[dept] = 1;
          }
        }
        for (const department in this.departmentStaffCount) {
          this.deptArray.push(department);
          this.staffCount.push(this.departmentStaffCount[department]);
          this.deptStaffColor.push(
            `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
              Math.random() * 256
            )},${Math.floor(Math.random() * 256)})`
          );
          this.deptSalaryColor.push(
            `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
              Math.random() * 256
            )},${Math.floor(Math.random() * 256)})`
          );
        }
        this.renderChart();
        // this.renderBarChart(this.deptArray, this.staffCount);
      }
      if (this.staffData != null) {
        this.staffData.forEach((element: any) => {
          const { department, salary } = element;
          // console.log(department + ' ' + salary);
          if (!this.departmentSalaryCount[department]) {
            this.departmentSalaryCount[department] = salary;
          } else {
            this.departmentSalaryCount[department] += salary;
          }
        });
        for (const dept in this.departmentSalaryCount) {
          this.salaryData.push(this.departmentSalaryCount[dept]);
          // console.log(this.salaryData);
          // console.log(dept + ' ' + this.departmentSalaryCount[dept]);
        }
        // console.log(this.departmentSalaryCount);
        this.renderSalaryChart();
      }
    });
    this.leaveService.noOfLeaveRequest().subscribe((res) => {
      this.leaveRequest = res;
    });
  }

  renderChart() {
    // console.log(this.myChart);
    if (this.myChart) {
      // console.log('hello');
      this.myChart.destroy();
    }
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    switch (this.chartType) {
      case 'pie':
        this.myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: this.deptArray,
            datasets: [
              {
                label: 'Staff',
                data: this.staffCount,
                borderWidth: 2,
                backgroundColor: this.deptStaffColor,
                hoverBorderColor: 'grey',
                hoverOffset: 4,
              },
            ],
          },
          options: {
            plugins: {
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
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  color: 'rgb(255, 99, 132)',
                  borderRadius: 0,
                },
              },
            },
          },
          plugins: [ChartDataLabels],
        });
        break;
      case 'bar':
        this.myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.deptArray,
            datasets: [
              {
                label: 'Staff',
                data: this.staffCount,
                backgroundColor: this.deptStaffColor,
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
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
                      size: 10,
                    },
                  },
                },
              },
            },
          },
          plugins: [ChartDataLabels],
        });
        break;
      case 'doughnut':
        this.myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.deptArray,
            datasets: [
              {
                label: 'Staff',
                data: this.staffCount,
                borderWidth: 2,
                backgroundColor: this.deptStaffColor,
                hoverBorderColor: 'grey',
                hoverOffset: 4,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
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
          },
          plugins: [ChartDataLabels],
        });
        break;
      case 'line':
        this.myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.deptArray,
            datasets: [
              {
                label: 'Staff',
                data: this.staffCount,
                fill: true,
                borderColor: this.deptStaffColor,
                tension: 0.1,
                pointBackgroundColor: '#fff',
                pointBorderColor: this.deptStaffColor,
                pointHoverBackgroundColor: this.deptStaffColor,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  color: 'rgb(255, 99, 132)',
                  borderRadius: 0,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: 'black',
                },
              },
              x: {
                title: {
                  color: 'black',
                  display: true,
                  text: 'Department',
                },
                ticks: {
                  color: 'black',
                },
              },
            },
          },
        });
        break;
      case 'polar':
        this.myChart = new Chart(ctx, {
          type: 'polarArea',
          data: {
            labels: this.deptArray,
            datasets: [
              {
                data: this.staffCount,
                backgroundColor: this.deptStaffColor,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
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

            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
          plugins: [ChartDataLabels],
        });
        break;
      default:
        break;
    }
  }

  renderSalaryChart() {
    // console.log(this.myChart);
    if (this.mySalaryChart) {
      // console.log('hello');
      this.mySalaryChart.destroy();
    }
    const ctx1 = document.getElementById('mySalaryChart') as HTMLCanvasElement;
    switch (this.salaryChartType) {
      case 'pie':
        this.mySalaryChart = new Chart(ctx1, {
          type: 'pie',
          data: {
            labels: this.deptArray,
            datasets: [
              {
                label: 'Salary',
                data: this.salaryData,
                borderWidth: 2,
                backgroundColor: this.deptSalaryColor,
                hoverBorderColor: 'grey',
                hoverOffset: 4,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
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
                      size: 10,
                    },
                  },
                },
              },
            },
          },
          plugins: [ChartDataLabels],
        });
        break;
      case 'bar':
        this.mySalaryChart = new Chart(ctx1, {
          type: 'bar',
          data: {
            labels: this.deptArray,
            datasets: [
              {
                label: 'Salary',
                data: this.salaryData,
                backgroundColor: this.deptSalaryColor,
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  color: 'rgb(255, 99, 132)',
                  borderRadius: 0,
                },
              },
            },
          },
        });
        break;
      case 'doughnut':
        this.mySalaryChart = new Chart(ctx1, {
          type: 'doughnut',
          data: {
            labels: this.deptArray,
            datasets: [
              {
                label: 'Staff',
                data: this.salaryData,
                borderWidth: 2,
                backgroundColor: this.deptSalaryColor,
                hoverBorderColor: 'grey',
                hoverOffset: 4,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
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
                      size: 10,
                    },
                  },
                },
              },
            },
          },
          plugins: [ChartDataLabels],
        });
        break;
      case 'line':
        this.mySalaryChart = new Chart(ctx1, {
          type: 'line',
          data: {
            labels: this.deptArray,

            datasets: [
              {
                label: 'Salary',
                data: this.salaryData,
                fill: true,
                borderColor: this.deptSalaryColor,
                tension: 0.1,
                pointBackgroundColor: '#fff',
                pointBorderColor: this.deptSalaryColor,
                pointHoverBackgroundColor: this.deptSalaryColor,
                borderWidth: 3,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  color: 'rgb(255, 99, 132)',
                  borderRadius: 0,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: 'black',
                  stepSize: 50000,
                },
              },
              x: {
                title: {
                  color: 'black',
                  display: true,
                  text: 'Department',
                },
                ticks: {
                  color: 'black',
                },
              },
            },
          },
        });
        break;
      case 'polar':
        this.mySalaryChart = new Chart(ctx1, {
          type: 'polarArea',
          data: {
            labels: this.deptArray,
            datasets: [
              {
                data: this.salaryData,
                backgroundColor: this.deptSalaryColor,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  color: 'rgb(255, 99, 132)',
                  borderRadius: 0,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        break;
      default:
        break;
    }
  }

  onChartTypeChange(event: any): void {
    this.chartType = event.target.value;
    // console.log(this.chartType);
    this.renderChart();
  }
  onSalaryChartTypeChange(event: any): void {
    this.salaryChartType = event.target.value;
    // console.log(this.chartType);
    this.renderSalaryChart();
  }
}
