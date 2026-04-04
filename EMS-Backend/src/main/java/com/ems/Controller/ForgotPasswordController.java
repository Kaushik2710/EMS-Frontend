package com.ems.Controller;

import java.time.Instant;
import java.util.Date;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ems.Repository.ForgotPasswordRepo;
import com.ems.Repository.RegisterRepo;
import com.ems.Service.EmailService;
import com.ems.model.ForgotPassword;
import com.ems.model.Register;
import com.ems.model.VerifyEmailDTO;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping(path = "ems")
@CrossOrigin(origins = "http://localhost:4200")
public class ForgotPasswordController {

    @Autowired
    private RegisterRepo registerRepo;
    @Autowired
    private EmailService emailService;
    @Autowired
    private ForgotPasswordRepo forgotPasswordRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/verifyEmail/{email}")
    @Transactional
    public ResponseEntity<?> verifyEmail(@PathVariable String email) {
        Register reg = registerRepo.findByEmail(email);

        VerifyEmailDTO emailDTO = new VerifyEmailDTO();
        if (reg == null) {
            emailDTO.setStatus(false);
            emailDTO.setEmail(email);
            return ResponseEntity.ok(emailDTO);
        } else {
            ForgotPassword fp = forgotPasswordRepo.findByRegister(reg);

            int otp = otpGenerator();
            String body = "This is the OTP for your Forgot Password Request:" + otp;

            if (fp != null) {
                fp.setOtp(otp);
                fp.setExpirationTime(new Date(System.currentTimeMillis() + 75 * 1000));
            } else {
                fp = new ForgotPassword();
                fp.setOtp(otp);
                fp.setExpirationTime(new Date(System.currentTimeMillis() + 75 * 1000));
                fp.setRegister(reg);

            }

            forgotPasswordRepo.save(fp);
            emailService.sendEmail(null, email, null, null, "OTP For Verification",
                    body);
            emailDTO.setStatus(true);
            emailDTO.setEmail(email);
            return ResponseEntity.ok(emailDTO);
        }
    }

    @GetMapping("verifyOtp/{otp}/{email}")
    @Transactional
    public ResponseEntity<?> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {
        Register reg = registerRepo.findByEmail(email);

        VerifyEmailDTO emailDTO = new VerifyEmailDTO();
        if (reg == null) {
            emailDTO.setStatus(false);
            emailDTO.setEmail(email);
            emailDTO.setMessage("Invalid Email");
            return ResponseEntity.ok(emailDTO);
        }
        ForgotPassword fp = forgotPasswordRepo.findByOtpAndRegister(otp, reg);
        if (fp == null) {
            emailDTO.setStatus(false);
            emailDTO.setEmail(email);
            emailDTO.setMessage("Not Match");
            ForgotPassword fp1 = forgotPasswordRepo.findByRegisterEmail(email);
            if (fp1 != null) {
                forgotPasswordRepo.deleteByFpid(fp1.getFpid());
            }
            return ResponseEntity.ok(emailDTO);
        }
        if (fp.getExpirationTime().before(Date.from(Instant.now()))) {
            forgotPasswordRepo.deleteById(fp.getFpid());
            emailDTO.setStatus(false);
            emailDTO.setEmail(email);
            emailDTO.setMessage("OTP Expired");
            return ResponseEntity.ok(emailDTO);
        }
        emailDTO.setStatus(true);
        emailDTO.setEmail(email);
        forgotPasswordRepo.deleteByFpid(fp.getFpid());
        return ResponseEntity.ok(emailDTO);
    }

    @PostMapping("/changePassword/{email}")
    public ResponseEntity<?> changePasswordHandler(@RequestParam("newPassword") String newPassword,
            @PathVariable String email) {
        VerifyEmailDTO emailDTO = new VerifyEmailDTO();
        String encodedPassword = passwordEncoder.encode(newPassword);
        registerRepo.updatePassword(email, encodedPassword);
        emailDTO.setEmail(email);
        emailDTO.setStatus(true);
        return ResponseEntity.ok(emailDTO);
    }

    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }
}
