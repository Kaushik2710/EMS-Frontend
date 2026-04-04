package com.ems.Controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ems.Service.ILeaveRequestService;
import com.ems.model.LeaveRequest;

@RestController
@RequestMapping(path = "ems")
@CrossOrigin(origins = "http://localhost:4200")
public class LeaveRequestController {
    @Autowired
    private ILeaveRequestService leaveRequestService;

    public ILeaveRequestService getLeaveRequestService() {
        return leaveRequestService;
    }

    public void setLeaveRequestService(ILeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    @PostMapping("/leaveRequest")
    public LeaveRequest submitLeaveRequest(@RequestParam("reason") String reason,
            @RequestParam("leaveFromDate") LocalDate leaveFromDate, @RequestParam("leaveToDate") LocalDate leaveToDate,
            @RequestParam("description") String description, @RequestParam("register_id") String email) {
        // System.out.println(leaveRequest.getRegister());
        return leaveRequestService.submitLeaveRequest(reason, leaveFromDate, leaveToDate, description, email);
    }

    @PostMapping("/approveLeave/{requestId}")
    public LeaveRequest approveLeaveRequest(@PathVariable Long requestId) {
        return leaveRequestService.approveLeaveRequest(requestId);
    }

    @PostMapping("/rejectLeave/{requestId}")
    public LeaveRequest rejectLeaveRequest(@PathVariable Long requestId) {
        return leaveRequestService.rejectLeaveRequest(requestId);
    }

    @GetMapping("/pendingLeaves")
    public List<LeaveRequest> getPendingLeaveRequests() {
        return leaveRequestService.getAllPendingLeaveRequests();
    }

    @GetMapping("/getAllLeave")
    public Iterable<LeaveRequest> getAllLeaveDetails() {
        return leaveRequestService.getAllLeaveDetails();
    }

    @GetMapping("/noOfLeaveRequest")
    public Integer noOfLeaveRequest() {
        return leaveRequestService.noOfLeaveRequest();
    }

    @GetMapping("/getUserLeaveData/{email}")
    public ResponseEntity<?> findByRegisterEmail(@PathVariable String email) {
        LeaveRequest lr = leaveRequestService.findByRegisterEmail(email);
        if (lr != null) {
            return ResponseEntity.ok(lr);
        } else {
            // return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Leave data not found
            // for requested user");
            return ResponseEntity.ok(null);
        }
    }

    @GetMapping("/getLeaveRequestsOfEmployee/{email}")
    public Integer countLeaveRequestsOfEmployee(@PathVariable String email) {
        return leaveRequestService.countLeaveRequestsOfEmployee(email);
    }
}
