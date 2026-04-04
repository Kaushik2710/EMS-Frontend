package com.ems.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.Repository.LeaveRequestRepo;
import com.ems.Repository.RegisterRepo;
import com.ems.model.LeaveRequest;
import com.ems.model.Register;

import jakarta.transaction.Transactional;

@Service
public class LeaveRequestService implements ILeaveRequestService {

    @Autowired
    private LeaveRequestRepo leaveRequestRepo;

    @Autowired
    private RegisterRepo registerRepo;

    public LeaveRequestRepo getLeaveRequestRepo() {
        return leaveRequestRepo;
    }

    public void setLeaveRequestRepo(LeaveRequestRepo leaveRequestRepo) {
        this.leaveRequestRepo = leaveRequestRepo;
    }

    @Override
    @Transactional
    public LeaveRequest submitLeaveRequest(String reason, LocalDate leaveFromDate, LocalDate leaveToDate,
            String description,
            String email) {
        Register reg = registerRepo.findByEmail(email);
        LeaveRequest lr = new LeaveRequest();
        lr.setRegister(reg);
        lr.setReason(reason);
        lr.setLeaveFromDate(leaveFromDate);
        lr.setLeaveToDate(leaveToDate);
        lr.setDescription(description);
        lr.setStatus("Pending");
        lr.setAppliedOn(LocalDateTime.now());
        return leaveRequestRepo.save(lr);
    }

    @Override
    @Transactional
    public List<LeaveRequest> getAllPendingLeaveRequests() {
        return leaveRequestRepo.findByStatus("Pending");
    }

    @Override
    public LeaveRequest approveLeaveRequest(Long requestId) {
        LeaveRequest lr = leaveRequestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));

        lr.setStatus("Approved");
        lr.setReplyOn(LocalDateTime.now());
        return leaveRequestRepo.save(lr);
    }

    @Override
    public LeaveRequest rejectLeaveRequest(Long requestId) {
        LeaveRequest lr = leaveRequestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
        lr.setStatus("Rejected");
        lr.setReplyOn(LocalDateTime.now());
        return leaveRequestRepo.save(lr);
    }

    @Override
    @Transactional
    public Iterable<LeaveRequest> getAllLeaveDetails() {
        Iterable<LeaveRequest> lr = leaveRequestRepo.findAll();
        return lr;
    }

    @Override
    public Integer noOfLeaveRequest() {
        return leaveRequestRepo.noOfLeaveRequest();
    }

    @Override
    @Transactional
    public LeaveRequest findByRegisterEmail(String email) {
        return leaveRequestRepo.findByRegisterEmail(email);
    }

    @Override
    public int countLeaveRequestsOfEmployee(String email) {
        return leaveRequestRepo.countByRegisterEmail(email);
    }
}
