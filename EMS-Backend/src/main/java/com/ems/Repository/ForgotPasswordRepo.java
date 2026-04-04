package com.ems.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ems.model.ForgotPassword;
import com.ems.model.Register;

@Repository
public interface ForgotPasswordRepo extends JpaRepository<ForgotPassword, Long> {
    @Query("select fp from ForgotPassword fp where fp.otp=?1 and fp.register=?2")
    ForgotPassword findByOtpAndRegister(Integer otp, Register register);

    ForgotPassword findByRegisterEmail(String email);

    void deleteByFpid(Long fpid);

    ForgotPassword findByRegister(Register reg);
}
