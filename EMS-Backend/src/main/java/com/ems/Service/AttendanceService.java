package com.ems.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ems.Repository.AttendanceRepo;
import com.ems.Repository.RegisterRepo;
import com.ems.model.Attendance;
import com.ems.model.AttendanceCountDTO;
import com.ems.model.Register;

import jakarta.transaction.Transactional;

@Service
public class AttendanceService implements IAttendanceService {
    @Autowired
    private AttendanceRepo attendanceRepo;

    @Autowired
    private RegisterRepo registerRepo;

    public AttendanceRepo getAttendanceRepo() {
        return attendanceRepo;
    }

    public void setAttendanceRepo(AttendanceRepo attendanceRepo) {
        this.attendanceRepo = attendanceRepo;
    }

    @Transactional
    public ResponseEntity<Object> markAttendance(List<Long> employeeIds, LocalDate date, boolean present,
            boolean halfDay) {
        List<String> results = new ArrayList<>();
        if (present && !halfDay) {
            for (Long employeeId : employeeIds) {
                Attendance newAttendance = new Attendance();
                Register reg = registerRepo.findById(employeeId).orElse(null);
                if (reg != null) {
                    newAttendance.setRegister(reg);
                }
                newAttendance.setDate(date);
                newAttendance.setPresent(present);
                newAttendance.setHalfDay(false);
                attendanceRepo.save(newAttendance);
                results.add("Marked Attendance for:" + employeeId);
            }
            List<Register> register = registerRepo.findAllByIdNotIn(employeeIds);
            if (register != null) {
                for (Register reg1 : register) {
                    Attendance attendance1 = new Attendance();
                    attendance1.setRegister(reg1);
                    attendance1.setDate(date);
                    attendance1.setHalfDay(false);
                    attendanceRepo.save(attendance1);
                    results.add("Attendance Marked as Absent for Employee Id:" + reg1.getId());
                }
            }
        } else if (present && halfDay) {

            for (Long employeeId : employeeIds) {
                Optional<Attendance> existingAttendance = attendanceRepo.findByRegisterIdAndDate(employeeId, date);
                if (existingAttendance.isPresent()) {
                    Attendance attendance = existingAttendance.get();
                    attendance.setPresent(present);
                    attendance.setHalfDay(present && halfDay);
                    attendanceRepo.save(attendance);
                    results.add("Marked Half Leave for:" + employeeId);
                } else {
                    Attendance newAttendance = new Attendance();
                    Register reg = registerRepo.findById(employeeId).orElse(null);
                    if (reg != null) {
                        newAttendance.setRegister(reg);
                    }
                    newAttendance.setDate(date);
                    newAttendance.setPresent(present);
                    newAttendance.setHalfDay(true);
                    attendanceRepo.save(newAttendance);
                    results.add("Marked Attendance for:" + employeeId);
                }
            }
        }
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @Transactional
    public List<Attendance> getAttendancesByDate(LocalDate Date) {
        return attendanceRepo.findByDate(Date);
    }

    @Transactional
    public AttendanceCountDTO getAttendanceForMonth(String email, int month, int year) {
        return attendanceRepo.getAttendanceForMonth(email, month, year);
    }

    // public List<Attendance> getAttendanceForWeek() {
    // return attendanceRepo.getAttendanceForWeek();
    // }

    // public List<Attendance> getAttendanceForYear() {
    // return attendanceRepo.getAttendanceForYear();
    // }
}
