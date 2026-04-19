import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';


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
  apiurl = environment.apiUrl;
  userData: any;
  public isAdminSubject = new BehaviorSubject<boolean>(false);
  public isEmployeeSubject = new BehaviorSubject<boolean>(false);
  public name = new BehaviorSubject<String>('John');
  public role = new BehaviorSubject<String>('Developer');
  getAll() {
    return this.http.get(environment.apiUrl + '/getAllUser');
  }
  // getByCode(code: any) {
  //   return this.http.get(this.apiurl + '/' + code);
  // }
  getUserByEmail(email: any) {
    return this.http.get(environment.apiUrl + '/getUser' + '/' + email);
  }
  ProceedRegister(formData: any) {
    return this.http.post(environment.apiUrl + '/registerUser', formData);
  }
  loginEmployee(body: any) {
    return this.http.post(environment.apiUrl + '/loginEmployee', body);
  }
  isLoggedIn() {
    return localStorage.getItem('id') != null;
  }
  verifyEmail(email: any) {
    return this.http.get(environment.apiUrl + '/verifyEmail' + '/' + email);
  }
  verifyOtp(otp: any, email: any) {
    return this.http.get(
      environment.apiUrl + '/verifyOtp' + '/' + otp + '/' + email
    );
  }
  changePassword(formData: any, email: any) {
    return this.http.post(
      environment.apiUrl + '/changePassword' + '/' + email,
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
