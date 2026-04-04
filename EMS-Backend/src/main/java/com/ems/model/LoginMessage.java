package com.ems.model;

public class LoginMessage {

    boolean isactive;
    boolean status;
    String message;
    String email;
    String role;
    String fname;

    public LoginMessage() {
    }

    public LoginMessage(boolean isactive, boolean status, String message, String email, String role, String fname) {
        this.isactive = isactive;
        this.status = status;
        this.message = message;
        this.email = email;
        this.role = role;
        this.fname = fname;
    }

    public boolean isIsactive() {
        return isactive;
    }

    public void setIsactive(boolean isactive) {
        this.isactive = isactive;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

}
