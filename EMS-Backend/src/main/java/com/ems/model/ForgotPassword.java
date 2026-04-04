package com.ems.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class ForgotPassword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fpid;
    private Integer otp;
    private Date expirationTime;
    @OneToOne
    private Register register;

    public ForgotPassword() {
    }

    public ForgotPassword(Long fpid, Integer otp, Date expirationTime, Register register) {
        this.fpid = fpid;
        this.otp = otp;
        this.expirationTime = expirationTime;
        this.register = register;
    }

    public Long getFpid() {
        return fpid;
    }

    public void setFpid(Long fpid) {
        this.fpid = fpid;
    }

    public Integer getOtp() {
        return otp;
    }

    public void setOtp(Integer otp) {
        this.otp = otp;
    }

    public Date getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(Date expirationTime) {
        this.expirationTime = expirationTime;
    }

    public Register getRegister() {
        return register;
    }

    public void setRegister(Register register) {
        this.register = register;
    }

}
