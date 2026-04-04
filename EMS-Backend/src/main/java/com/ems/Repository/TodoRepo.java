package com.ems.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ems.model.Todo;

import jakarta.transaction.Transactional;

import java.util.List;

@Repository
public interface TodoRepo extends JpaRepository<Todo, Long> {
    List<Todo> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("update Todo td set td.email=:newEmail where td.email=:email")
    public void updateEmail(String email, String newEmail);
}
