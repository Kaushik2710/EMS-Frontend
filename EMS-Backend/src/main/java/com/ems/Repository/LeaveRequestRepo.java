package com.ems.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ems.model.LeaveRequest;

@Repository
public interface LeaveRequestRepo extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByStatus(String status);

    LeaveRequest findByRegisterEmail(String email);

    @Query(value = "select count(*) from leave_request lr where lr.status='Pending'", nativeQuery = true)
    Integer noOfLeaveRequest();

    int countByRegisterEmail(String email);
}
