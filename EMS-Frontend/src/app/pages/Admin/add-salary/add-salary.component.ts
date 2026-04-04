import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-salary',
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
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './add-salary.component.html',
  styleUrl: './add-salary.component.css',
})
export class AddSalaryComponent implements OnInit {
  salaryService: ManageStaffService = inject(ManageStaffService);
  toast: ToastrService = inject(ToastrService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  sdata: any;
  dataSource: any;
  salaryData: any;
  displayColumns: string[] = [
    'no',
    'Name',
    'department',
    'Basic',
    'allowance',
    'total',
    'action',
  ];
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.salaryService.getAllUsers().subscribe((res: any) => {
      this.sdata = res.map((item: any) => ({
        ...item,
        basic: 0,
        allowance: 0,
        total: 0,
      }));
      this.dataSource = new MatTableDataSource(this.sdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.sdata.map((item: any, index: any) => ({
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
  calculateTotal(row: any): void {
    row.total = row.basic + row.allowance;
  }
  addSalary(element: any) {
    const formData = new FormData();
    formData.append('salary', element.total);
    // console.log(formData);
    // console.log(element.total);
    this.salaryService.addSalary(element.email, formData).subscribe((res) => {
      this.toast.success('Added Successfully', 'Success', {
        timeOut: 3000,
        closeButton: true,
      });
    });
  }
}
