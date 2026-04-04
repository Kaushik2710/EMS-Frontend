package com.ems.model;

import java.time.LocalDate;

public class Employeeedit {
    private String fname;
    private String lname;
    private String email;
    private String department;
    private LocalDate dateOfJoining;
    private LocalDate dateOfBirth;
    private String phone;
    private Float salary;

    public Employeeedit() {
    }

    public Employeeedit(String fname, String lname, String email, String department, LocalDate dateOfJoining,
            LocalDate dateOfBirth, String phone, Float salary) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.department = department;
        this.dateOfJoining = dateOfJoining;
        this.dateOfBirth = dateOfBirth;
        this.phone = phone;
        this.salary = salary;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDate getDateOfJoining() {
        return dateOfJoining;
    }

    public void setDateOfJoining(LocalDate dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Float getSalary() {
        return salary;
    }

    public void setSalary(Float salary) {
        this.salary = salary;
    }
}
