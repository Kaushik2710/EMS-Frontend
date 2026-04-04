package com.ems.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ems.model.Social;

@Repository
public interface SocialRepo extends JpaRepository<Social, Long> {
    public Social findByEmail(String email);
}
