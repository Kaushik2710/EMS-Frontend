import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LeaveService } from '../../../core/service/leave.service';
import { DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-leave-history',
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
    MatTooltipModule,
    DatePipe,
    MatChipsModule,
  ],
  templateUrl: './employee-leave-history.component.html',
  styleUrl: './employee-leave-history.component.css',
})
export class EmployeeLeaveHistoryComponent implements OnInit {
  leaveService: LeaveService = inject(LeaveService);
  toast: ToastrService = inject(ToastrService);
  userId!: any;
  leaveData!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: any;
  displayColumns: string[] = [
    'no',
    'reason',
    'description',
    'leaveFromDate',
    'leaveToDate',
    'status',
  ];
  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.leaveService.findByRegisterEmail(this.userId).subscribe({
      next: (res) => {
        if (res) {
          this.leaveData = [res];
          this.dataSource = new MatTableDataSource(this.leaveData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.data = this.leaveData.map(
            (item: any, index: any) => ({
              ...item,
              id: this.calculateId(index),
            })
          );
          this.dataSource.sort = this.sort;
        } else {
          this.toast.info('No Leave Data Found', 'Information', {
            timeOut: 3000,
            closeButton: true,
          });
        }
      },
      error: (err) => {
        this.toast.error('No Leave Data Found', 'Information', {
          timeOut: 3000,
          closeButton: true,
        });
      },
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
}
