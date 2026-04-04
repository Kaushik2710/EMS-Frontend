package com.ems.Service;

import java.time.LocalDate;
import java.util.List;

import com.ems.model.LeaveRequest;

public interface ILeaveRequestService {
    public LeaveRequest submitLeaveRequest(String reason, LocalDate leaveFromDate, LocalDate leaveToDate,
            String description,
            String email);

    public List<LeaveRequest> getAllPendingLeaveRequests();

    public LeaveRequest approveLeaveRequest(Long requestId);

    public LeaveRequest rejectLeaveRequest(Long requestId);

    public Iterable<LeaveRequest> getAllLeaveDetails();

    public Integer noOfLeaveRequest();

    public LeaveRequest findByRegisterEmail(String email);

    public int countLeaveRequestsOfEmployee(String email);
}
