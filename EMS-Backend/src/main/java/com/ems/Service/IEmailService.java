package com.ems.Service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface IEmailService {

    Map<String, Object> sendEmail(MultipartFile[] file, String to, String[] cc, String[] bcc, String subject,
            String body);

}
