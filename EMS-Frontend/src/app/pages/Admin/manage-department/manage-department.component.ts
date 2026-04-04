import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as alertify from 'alertifyjs';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
import { AddDepartmentPopupComponent } from '../add-department-popup/add-department-popup.component';
import { EditDepartmentPopupComponent } from '../edit-department-popup/edit-department-popup.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-department',
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
    MatMenuModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  templateUrl: './manage-department.component.html',
  styleUrl: './manage-department.component.css',
})
export class ManageDepartmentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  deptList!: any;
  dataSource: any;
  displayColumns: string[] = ['no', 'departmentName', 'action'];
  toast: ToastrService = inject(ToastrService);
  constructor(
    private manageStaff: ManageStaffService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.manageStaff.getAllDepartment().subscribe((res) => {
      this.deptList = res;
      this.dataSource = new MatTableDataSource(this.deptList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.deptList.map((item: any, index: any) => ({
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
  addDepartment() {
    const _addPopup = this.dialog.open(AddDepartmentPopupComponent, {
      width: '50%',
      enterAnimationDuration: '350ms',
      exitAnimationDuration: '350ms',
    });
    _addPopup.afterClosed().subscribe((r) => {
      this.loadData();
    });
  }
  removeDepartment(id: any) {
    alertify
      .confirm(
        'Remove Department',
        'Are you Sure to remove this Department?',
        () => {
          this.manageStaff.deleteDepartment(String(id)).subscribe((res) => {
            this.toast.success('Deleted Successfully', 'success', {
              timeOut: 3000,
              closeButton: true,
            });
            this.loadData();
          });
        },
        function () {}
      )
      .set('labels', { ok: 'Yes', cancel: 'No' })
      .set({ transition: 'flipx' })
      .set('movable', false);
  }
  editDepartment(element: any) {
    const _editUserPopup = this.dialog.open(EditDepartmentPopupComponent, {
      width: '50%',
      enterAnimationDuration: '350ms',
      exitAnimationDuration: '350ms',
      data: {
        data: element,
      },
    });
    _editUserPopup.afterClosed().subscribe((r) => {
      this.loadData();
    });
  }
}
