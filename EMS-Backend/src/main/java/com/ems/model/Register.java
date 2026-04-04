package com.ems.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Register {

    // columns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fname;
    private String lname;
    private String email;
    private String gender;
    private String department;
    private LocalDate dateOfJoining;
    private LocalDate dateOfBirth;
    private String password;
    private String cPassword;
    private String phone;
    private Float salary;
    private String userRole;
    private boolean isactive;
    @Column(columnDefinition = "TEXT[]")
    private String[] skills;
    @Lob
    private String image;
    @Embedded
    private Address address;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Experience> experience;

    @OneToMany(mappedBy = "register", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<LeaveRequest> leaveRequests;

    @OneToOne(mappedBy = "register", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private ForgotPassword forgotPassword;

    @OneToMany(mappedBy = "register", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Attendance> attendance;

    @OneToMany(mappedBy = "register", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<EmployeeSalary> employeeSalaries;

    public Register(Long id, String fname, String lname, String email, String gender, String department,
            LocalDate dateOfJoining, LocalDate dateOfBirth, String password, String cPassword, String phone,
            Float salary, String userRole, boolean isactive, String[] skills, String image, Address address,
            List<Experience> experience) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.gender = gender;
        this.department = department;
        this.dateOfJoining = dateOfJoining;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.cPassword = cPassword;
        this.phone = phone;
        this.salary = salary;
        this.userRole = userRole;
        this.isactive = isactive;
        this.skills = skills;
        this.image = image;
        this.address = address;
        this.experience = experience;
    }

    public Register(Long id, String fname, String lname, String email, String gender, String department,
            LocalDate dateOfJoining, LocalDate dateOfBirth, String password, String cPassword, String phone,
            Float salary, String userRole, boolean isactive, String[] skills, String image, Address address,
            List<Experience> experience, List<LeaveRequest> leaveRequests) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.gender = gender;
        this.department = department;
        this.dateOfJoining = dateOfJoining;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.cPassword = cPassword;
        this.phone = phone;
        this.salary = salary;
        this.userRole = userRole;
        this.isactive = isactive;
        this.skills = skills;
        this.image = image;
        this.address = address;
        this.experience = experience;
        this.leaveRequests = leaveRequests;

    }

    // getter & setters
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String[] getSkills() {
        return skills;
    }

    public void setSkills(String[] skills) {
        this.skills = skills;
    }

    public Register() {
    }

    public Long getId() {
        return id;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getSalary() {
        return salary;
    }

    public void setSalary(Float salary) {
        this.salary = salary;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getcPassword() {
        return cPassword;
    }

    public void setcPassword(String cPassword) {
        this.cPassword = cPassword;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<Experience> getExperience() {
        return experience;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public boolean isIsactive() {
        return isactive;
    }

    public void setIsactive(boolean isactive) {
        this.isactive = isactive;
    }

    public void setExperience(List<Experience> experience) {
        this.experience = experience;
    }

    public List<LeaveRequest> getLeaveRequests() {
        return leaveRequests;
    }

    public void setLeaveRequests(List<LeaveRequest> leaveRequests) {
        this.leaveRequests = leaveRequests;
    }

    public ForgotPassword getForgotPassword() {
        return forgotPassword;
    }

    public void setForgotPassword(ForgotPassword forgotPassword) {
        this.forgotPassword = forgotPassword;
    }

    public List<Attendance> getAttendance() {
        return attendance;
    }

    public void setAttendance(List<Attendance> attendance) {
        this.attendance = attendance;
    }

}
