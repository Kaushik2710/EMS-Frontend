import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ManageStaffService } from '../../../core/service/manage-staff.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { EditUserPopupComponent } from '../edit-user-popup/edit-user-popup.component';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-manage-staff',
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
    DecimalPipe,
    DatePipe,
    MatMenuModule,
    CurrencyPipe,
    MatDialogModule,
  ],
  templateUrl: './manage-staff.component.html',
  styleUrl: './manage-staff.component.css',
})
export class ManageStaffComponent implements OnInit {
  toast: ToastrService = inject(ToastrService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userList!: any;
  dataSource: any;
  displayColumns: string[] = [
    'no',
    'name',
    'email',
    'phone',
    'salary',
    'department',
    'doj',
    'date',
    'city',
    'country',
    'action',
  ];
  id: number = 0;

  constructor(
    private manageStaff: ManageStaffService,
    private route: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.manageStaff.getAllUsers().subscribe((res) => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.userList.map((item: any, index: any) => ({
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
  moreInfoUser(element: any) {
    this.dialog.open(PopupComponent, {
      width: '50%',
      enterAnimationDuration: '350ms',
      exitAnimationDuration: '350ms',
      data: {
        data: element,
      },
    });
  }
  addUser() {
    this.route.navigate(['admin/add-staff']);
  }
  removeUser(email: string) {
    alertify
      .confirm(
        'Remove User',
        'Are you Sure to remove this user?',
        () => {
          this.manageStaff.deleteUser(email).subscribe((res) => {
            this.loadData();
            this.toast.success('Deleted Successfully', 'Success', {
              timeOut: 3000,
              closeButton: true,
            });
          });
        },
        function () {}
      )
      .set('labels', { ok: 'Yes', cancel: 'No' })
      .set({ transition: 'flipx' })
      .set('movable', false);
  }
  editUser(element: any) {
    const _editUserPopup = this.dialog.open(EditUserPopupComponent, {
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
  // Downloading Data
  export(format: 'xlsx' | 'csv' | 'json' | 'txt') {
    if (format === 'xlsx') {
      this.exportToExcel();
    } else if (format === 'csv') {
      this.exportToCsv();
    } else if (format === 'json') {
      this.exportToJson();
    }
  }
  private exportToExcel() {
    const flattenedData = this.flattenData(this.userList);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveFile(excelBuffer, 'table_data.xlsx');
  }
  private exportToCsv() {
    const flattenedData = this.flattenData(this.userList);
    const csvData = this.convertToCSV(flattenedData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'table_data.csv');
  }

  private exportToJson() {
    const dataToExport = JSON.parse(JSON.stringify(this.userList));
    for (let i = 0; i < dataToExport.length; i++) {
      delete dataToExport[i].image;
      delete dataToExport[i].userRole;
      delete dataToExport[i].isactive;
      delete dataToExport[i].password;
      delete dataToExport[i].cPassword;
    }
    const json = JSON.stringify(dataToExport);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'table_data.json');
  }

  private convertToCSV(data: any[]): string {
    const csvRows: string[] = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map((header) => {
        if (
          header === 'skills' ||
          header === 'address' ||
          header === 'experience'
        ) {
          return `"${row[header]}"`;
        } else {
          return row[header];
        }
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  }

  private flattenData(data: any[]): any[] {
    const flattenedData = [];
    for (const item of data) {
      const flatItem: any = { ...item };
      flatItem.address = `${item.address.street}, ${item.address.postalcode},${item.address.region}, ${item.address.city}, ${item.address.country}`;
      flatItem.experience = item.experience
        .map(
          (exp: any) =>
            `${exp.company},(${exp.totalExp} years),${exp.position},${exp.start},${exp.endDate}`
        )
        .join('; ');
      flatItem.skills = item.skills.join(', ');
      delete flatItem.image;
      delete flatItem.userRole;
      delete flatItem.isactive;
      delete flatItem.password;
      delete flatItem.cPassword;
      flattenedData.push(flatItem);
    }
    return flattenedData;
  }
  private saveFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, fileName);
  }
}
