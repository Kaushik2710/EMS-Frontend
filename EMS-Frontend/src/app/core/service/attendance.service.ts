import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private http: HttpClient) {}
  markAttendace(
    employeeIds: number[],
    presentDate: any,
    present: boolean,
    halfDay: boolean
  ) {
    const payload = {
      employeeIds: employeeIds,
      presentDate: presentDate,
      present: present,
      halfDay: halfDay,
    };
    return this.http.post(environment.apiUrl + '/markAttendace', payload);
  }
  getAttendancesByDate(date: any) {
    return this.http.get(
      environment.apiUrl + '/getAttendanceByDate' + '/' + date
    );
  }
  getAttendanceOfMonth(email: any, month: any, year: any) {
    return this.http.get(
      environment.apiUrl + '/getAttendanceOfMonth' +
        '/' +
        email +
        '/' +
        month +
        '/' +
        year
    );
  }
}
