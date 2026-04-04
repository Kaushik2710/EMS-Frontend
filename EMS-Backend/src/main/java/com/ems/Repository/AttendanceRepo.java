package com.ems.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ems.model.Attendance;
import com.ems.model.AttendanceCountDTO;

@Repository
public interface AttendanceRepo extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByRegisterIdAndDate(Long id, LocalDate date);

    List<Attendance> findByDate(LocalDate date);

    @Query("SELECT new com.ems.model.AttendanceCountDTO(" +
            "SUM(CASE WHEN a.present = true AND a.halfDay = false THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN a.present = false THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN a.halfDay = true THEN 1 ELSE 0 END)) " +
            "FROM Attendance a JOIN a.register e WHERE e.email = :email AND MONTH(a.date) = :month AND YEAR(a.date)=:year")
    AttendanceCountDTO getAttendanceForMonth(@Param("email") String email, @Param("month") int month,
            @Param("year") int year);

    // @Query("SELECT a FROM Attendance a WHERE WEEK(a.date) =
    // WEEK(CURRENT_DATE())")
    // List<Attendance> getAttendanceForWeek();

    // @Query("SELECT a FROM Attendance a WHERE YEAR(a.date) =
    // YEAR(CURRENT_DATE())")
    // List<Attendance> getAttendanceForYear();
}
