package com.ems.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.Repository.SocialRepo;
import com.ems.model.Social;

@Service
public class SocialService implements ISocialService {
    @Autowired
    private SocialRepo socialRepo;

    public SocialRepo getSocialRepo() {
        return socialRepo;
    }

    public void setSocialRepo(SocialRepo socialRepo) {
        this.socialRepo = socialRepo;
    }

    @Override
    public Social addLinks(Social social) {
        Social s = socialRepo.save(social);
        return s;
    }

    @Override
    public Social getLinks(String email) {
        Social s = socialRepo.findByEmail(email);
        return s;
    }
}
