package com.ems.Controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.Service.IAttendanceService;
import com.ems.model.Attendance;
import com.ems.model.AttendanceCountDTO;
import com.ems.model.AttendanceRequestDTO;

@RestController
@RequestMapping(path = "ems")
@CrossOrigin(origins = "http://localhost:4200")
public class AttendanceController {
    @Autowired
    private IAttendanceService attendanceService;

    public IAttendanceService getAttendanceService() {
        return attendanceService;
    }

    public void setAttendanceService(IAttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/markAttendace")
    public ResponseEntity<Object> markAttendance(@RequestBody AttendanceRequestDTO request) {
        try {
            ResponseEntity<Object> results = attendanceService.markAttendance(request.getEmployeeIds(),
                    request.getPresentDate(), request.isPresent(),
                    request.isHalfDay());

            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error:" + e.getMessage());
        }
    }

    @GetMapping("/getAttendanceByDate/{Date}")
    public List<Attendance> getAttendancesByDate(@PathVariable LocalDate Date) {
        return attendanceService.getAttendancesByDate(Date);
    }

    @GetMapping("/getAttendanceOfMonth/{email}/{month}/{year}")
    public AttendanceCountDTO getAttendanceForMonth(@PathVariable String email, @PathVariable int month,
            @PathVariable int year) {
        return attendanceService.getAttendanceForMonth(email, month, year);
    }
}
