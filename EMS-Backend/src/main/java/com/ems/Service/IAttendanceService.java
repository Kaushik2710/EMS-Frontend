package com.ems.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;

import com.ems.model.Attendance;
import com.ems.model.AttendanceCountDTO;

public interface IAttendanceService {
    ResponseEntity<Object> markAttendance(List<Long> employeeIds, LocalDate date, boolean present, boolean halfDay);

    List<Attendance> getAttendancesByDate(LocalDate Date);

    AttendanceCountDTO getAttendanceForMonth(String email, int month, int year);

    // public List<Attendance> getAttendanceForWeek();

    // public List<Attendance> getAttendanceForYear();
}
