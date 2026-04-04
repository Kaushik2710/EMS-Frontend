import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    if (this.getUserRole() === 'admin') {
      this.isAdminSubject.next(true);
    } else if (this.getUserRole() === 'employee') {
      this.isEmployeeSubject.next(true);
    }
    this.getUserByEmail(localStorage.getItem('id')).subscribe((value) => {
      this.userData = value;
      this.name.next(this.userData.fname + ' ' + this.userData.lname);
      this.role.next(this.userData.department);
    });
  }
  apiurl = 'http://localhost:3000/user';
  userData: any;
  public isAdminSubject = new BehaviorSubject<boolean>(false);
  public isEmployeeSubject = new BehaviorSubject<boolean>(false);
  public name = new BehaviorSubject<String>('John');
  public role = new BehaviorSubject<String>('Developer');
  getAll() {
    return this.http.get('http://localhost:8080/ems/getAllUser');
  }
  // getByCode(code: any) {
  //   return this.http.get(this.apiurl + '/' + code);
  // }
  getUserByEmail(email: any) {
    return this.http.get('http://localhost:8080/ems/getUser' + '/' + email);
  }
  ProceedRegister(formData: any) {
    return this.http.post('http://localhost:8080/ems/registerUser', formData);
  }
  loginEmployee(body: any) {
    return this.http.post('http://localhost:8080/ems/loginEmployee', body);
  }
  isLoggedIn() {
    return localStorage.getItem('id') != null;
  }
  verifyEmail(email: any) {
    return this.http.get('http://localhost:8080/ems/verifyEmail' + '/' + email);
  }
  verifyOtp(otp: any, email: any) {
    return this.http.get(
      'http://localhost:8080/ems/verifyOtp' + '/' + otp + '/' + email
    );
  }
  changePassword(formData: any, email: any) {
    return this.http.post(
      'http://localhost:8080/ems/changePassword' + '/' + email,
      formData
    );
  }
  onLoggedIn() {
    this.getUserByEmail(localStorage.getItem('id')).subscribe((value) => {
      this.userData = value;
      this.name.next(this.userData.fname + ' ' + this.userData.lname);
      this.role.next(this.userData.department);
    });
    this.loginAsAdmin();
    this.loginAsEmployee();
  }
  getUserRole() {
    return localStorage.getItem('role') != null
      ? localStorage.getItem('role')?.toString()
      : '';
  }

  loginAsAdmin() {
    if (this.getUserRole() === 'admin') {
      this.isAdminSubject.next(true);
    } else {
      this.isAdminSubject.next(false);
    }
  }
  loginAsEmployee() {
    if (this.getUserRole() === 'employee' && this.isLoggedIn()) {
      this.isEmployeeSubject.next(true);
    } else {
      this.isEmployeeSubject.next(false);
    }
  }
  logOutAdmin() {
    localStorage.clear();
    this.isAdminSubject.next(false);
  }
  logOutEmployee() {
    localStorage.clear();
    this.isEmployeeSubject.next(false);
  }
}
