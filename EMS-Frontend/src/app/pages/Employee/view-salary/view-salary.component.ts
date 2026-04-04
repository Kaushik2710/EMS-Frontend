import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InvoicePopupComponent } from '../invoice-popup/invoice-popup.component';

@Component({
  selector: 'app-view-salary',
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
    DatePipe,
    CurrencyPipe,
    MatDialogModule,
  ],
  templateUrl: './view-salary.component.html',
  styleUrl: './view-salary.component.css',
})
export class ViewSalaryComponent implements OnInit {
  salaryData: any;
  userId: any;
  manageStaffService: ManageStaffService = inject(ManageStaffService);
  dialog: MatDialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  displayColumns: string[] = [
    'no',
    'name',
    'department',
    'salary',
    'paidOn',
    'action',
  ];
  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.manageStaffService
      .getEmployeeSalaryData(this.userId)
      .subscribe((res) => {
        this.salaryData = [res];
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
  openInvoice(element: any) {
    this.dialog.open(InvoicePopupComponent, {
      width: '100%',

      enterAnimationDuration: '350ms',
      exitAnimationDuration: '350ms',
      data: {
        data: element,
      },
    });
  }
}
