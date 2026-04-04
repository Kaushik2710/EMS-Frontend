package com.ems.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "register_id", referencedColumnName = "id")
    private Register register;
    private String reason;
    private LocalDate leaveFromDate;
    private LocalDate leaveToDate;
    private String description;
    private String status;
    private LocalDateTime appliedOn;
    private LocalDateTime replyOn;

    public LeaveRequest() {
    }

    public LeaveRequest(long id, Register register, String reason, LocalDate leaveFromDate, LocalDate leaveToDate,
            String description, String status, LocalDateTime appliedOn, LocalDateTime replyOn) {
        this.id = id;
        this.register = register;
        this.reason = reason;
        this.leaveFromDate = leaveFromDate;
        this.leaveToDate = leaveToDate;
        this.description = description;
        this.status = status;
        this.appliedOn = appliedOn;
        this.replyOn = replyOn;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Register getRegister() {
        return register;
    }

    public void setRegister(Register register) {
        this.register = register;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDate getLeaveFromDate() {
        return leaveFromDate;
    }

    public void setLeaveFromDate(LocalDate leaveFromDate) {
        this.leaveFromDate = leaveFromDate;
    }

    public LocalDate getLeaveToDate() {
        return leaveToDate;
    }

    public void setLeaveToDate(LocalDate leaveToDate) {
        this.leaveToDate = leaveToDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getAppliedOn() {
        return appliedOn;
    }

    public void setAppliedOn(LocalDateTime appliedOn) {
        this.appliedOn = appliedOn;
    }

    public LocalDateTime getReplyOn() {
        return replyOn;
    }

    public void setReplyOn(LocalDateTime replyOn) {
        this.replyOn = replyOn;
    }

}
