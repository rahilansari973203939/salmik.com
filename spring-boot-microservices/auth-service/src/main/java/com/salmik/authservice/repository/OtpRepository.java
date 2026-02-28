package com.salmik.authservice.repository;

import com.salmik.authservice.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {
    Optional<Otp> findTopByEmailAndPurposeOrderByCreatedAtDesc(String email, String purpose);
    void deleteByEmail(String email);
}
