package com.ems.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.Service.ISocialService;
import com.ems.model.Social;

@RestController
@RequestMapping(path = "ems")
@CrossOrigin(origins = "http://localhost:4200")
public class SocialController {
    @Autowired
    private ISocialService socialService;

    public ISocialService getSocialService() {
        return socialService;
    }

    public void setSocialService(ISocialService socialService) {
        this.socialService = socialService;
    }

    @PostMapping("/addLinks")
    public Social addSocial(@RequestBody Social social) {
        Social s = new Social();
        s.setGithub(social.getGithub());
        s.setEmail(social.getEmail());
        s.setLinkedin(social.getLinkedin());
        socialService.addLinks(s);
        return s;
    }

    @GetMapping("/getLinks/{email}")
    public Social getLinks(@PathVariable String email) {
        Social s = socialService.getLinks(email);
        return s;
    }
}
