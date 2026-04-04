import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
import { CurrencyPipe } from '@angular/common';
import { AttendanceService } from '../../../core/service/attendance.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-manage-salary',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CurrencyPipe,
  ],
  templateUrl: './manage-salary.component.html',
  styleUrl: './manage-salary.component.css',
})
export class ManageSalaryComponent implements OnInit {
  salaryService: ManageStaffService = inject(ManageStaffService);
  attendanceService: AttendanceService = inject(AttendanceService);
  toast: ToastrService = inject(ToastrService);
  currency: CurrencyPipe = new CurrencyPipe('en-US');
  totalSalary: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  salaryData: any;
  attendanceData: any;
  today: any;
  displayColumns: string[] = [
    'no',
    'Name',
    'department',
    'email',
    'phone',
    'salary',
    'action',
  ];
  ngOnInit(): void {
    this.loadData();
    this.today = new Date();
  }
  loadData() {
    this.salaryService.getUserSalaryData().subscribe((res) => {
      this.salaryData = res;
      this.dataSource = new MatTableDataSource(this.salaryData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.salaryData.map((item: any, index: any) => ({
        ...item,
        id: this.calculateId(index),
      }));
      this.dataSource.sort = this.sort;
    });
  }
  calculateId(index: number): number {
    const pageIndex = this.paginator.pageIndex || 0;
    const pageSize = this.paginator.pageSize || 5;
    const startingIndex = pageIndex * pageSize;
    return startingIndex + index + 1;
  }
  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
  calculateSalary(element: any) {
    this.attendanceService
      .getAttendanceOfMonth(
        element.email,
        this.today.getMonth() + 1,
        this.today.getFullYear()
      )
      .subscribe((res) => {
        this.attendanceData = res;
        const totalDaysInMonth = new Date(
          this.today.getFullYear(),
          this.today.getMonth() + 1,
          0
        ).getDate();
        let totalWorkingDays = 0;
        for (let day = 1; day <= totalDaysInMonth; day++) {
          const currentDate = new Date(
            this.today.getFullYear(),
            this.today.getMonth(),
            day
          );
          if (currentDate.getDay() !== 6 && currentDate.getDay() !== 0) {
            totalWorkingDays++;
          }
        }
        const oneDaySalary = element.salary / totalWorkingDays;
        const halfDaySalary = oneDaySalary / 2;
        if (
          this.attendanceData.absentCount != 0 ||
          this.attendanceData.halfDayCount != 0
        ) {
          if (
            this.attendanceData.absentCount != 0 &&
            this.attendanceData.halfDayCount == 0
          ) {
            this.totalSalary =
              element.salary - this.attendanceData.absentCount * oneDaySalary;
          } else if (
            this.attendanceData.absentCount == 0 &&
            this.attendanceData.halfDayCount != 0
          ) {
            this.totalSalary =
              element.salary - this.attendanceData.halfDayCount * halfDaySalary;
          } else {
            this.totalSalary =
              element.salary -
              this.attendanceData.absentCount * oneDaySalary -
              this.attendanceData.halfDayCount * halfDaySalary;
          }
        } else {
          this.totalSalary = element.salary;
        }

        // console.log(this.totalSalary.toFixed(2));
        this.paySalary(
          element.id,
          this.totalSalary.toFixed(2),
          element.fname,
          element.lname
        );
      });
  }

  paySalary(id: any, salary: any, fname: any, lname: any) {
    alertify
      .confirm(
        'Pay Salary',
        'Total Payable Salary To ' +
          fname.bold() +
          ' ' +
          lname.bold() +
          ' is ' +
          this.currency.transform(parseFloat(salary), 'INR')?.bold(),
        () => {
          this.salaryService.paySalary(id, salary).subscribe((res) => {
            this.toast.success(
              this.currency.transform(parseFloat(salary), 'INR') +
                ' Paid Successfully',
              'Success',
              {
                timeOut: 3000,
                closeButton: true,
              }
            );
          });
        },
        function () {}
      )
      .set('labels', { ok: 'Pay', cancel: 'Cancel' })
      .set({ transition: 'flipx' })
      .set('movable', false);
  }
}
