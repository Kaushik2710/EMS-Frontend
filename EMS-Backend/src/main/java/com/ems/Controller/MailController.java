package com.ems.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ems.Service.IEmailService;

@RestController
@RequestMapping(path = "ems")
@CrossOrigin(origins = "http://localhost:4200")
public class MailController {
    @Autowired
    private IEmailService emailService;

    public IEmailService getEmailService() {
        return emailService;
    }

    public void setEmailService(IEmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/sendEmail")
    public Map<String, Object> sendEmail(@RequestParam(value = "file", required = false) MultipartFile[] file,
            @RequestParam("to") String to,
            @RequestParam(value = "cc", required = false) String cc[],
            @RequestParam(value = "bcc", required = false) String[] bcc, @RequestParam("subject") String subject,
            @RequestParam("body") String body) {
        return emailService.sendEmail(file, to, cc, bcc, subject, body);
    }
}
