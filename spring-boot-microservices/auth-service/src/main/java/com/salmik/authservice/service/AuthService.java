package com.salmik.authservice.service;

import com.salmik.authservice.dto.AuthResponse;
import com.salmik.authservice.dto.UserDTO;
import com.salmik.authservice.entity.Otp;
import com.salmik.authservice.entity.User;
import com.salmik.authservice.repository.OtpRepository;
import com.salmik.authservice.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Random;

@Service
public class AuthService {
    
    private final UserRepository userRepository;
    private final OtpRepository otpRepository;
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private long jwtExpiration;
    
    public AuthService(UserRepository userRepository, OtpRepository otpRepository) {
        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
    }
    
    public AuthResponse register(String email, String password, String name) {
        if (userRepository.existsByEmail(email)) {
            return new AuthResponse(false, "Email already registered");
        }
        
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setName(name);
        user.setRole("CUSTOMER");
        
        user = userRepository.save(user);
        
        String token = generateToken(user);
        UserDTO userDTO = new UserDTO(user.getId(), user.getEmail(), user.getName(), user.getRole());
        
        return new AuthResponse(true, "Registration successful", token, userDTO);
    }
    
    public AuthResponse login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElse(null);
        
        if (user == null || !user.getPassword().equals(password)) {
            return new AuthResponse(false, "Invalid email or password");
        }
        
        String token = generateToken(user);
        UserDTO userDTO = new UserDTO(user.getId(), user.getEmail(), user.getName(), user.getRole());
        
        return new AuthResponse(true, "Login successful", token, userDTO);
    }
    
    public AuthResponse sendOtp(String email, String purpose) {
        // Generate 6-digit OTP
        String otpCode = String.format("%06d", new Random().nextInt(999999));
        
        // Delete old OTPs for this email
        otpRepository.deleteByEmail(email);
        
        // Save new OTP
        Otp otp = new Otp();
        otp.setEmail(email);
        otp.setCode(otpCode);
        otp.setPurpose(purpose);
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(10));
        
        otpRepository.save(otp);
        
        // TODO: Send OTP via email service
        System.out.println("OTP sent to " + email + ": " + otpCode);
        
        return new AuthResponse(true, "OTP sent successfully");
    }
    
    public AuthResponse verifyOtp(String email, String otpCode, String purpose) {
        Otp otp = otpRepository.findTopByEmailAndPurposeOrderByCreatedAtDesc(email, purpose)
                .orElse(null);
        
        if (otp == null) {
            return new AuthResponse(false, "OTP not found");
        }
        
        if (otp.isExpired()) {
            return new AuthResponse(false, "OTP expired");
        }
        
        if (!otp.getCode().equals(otpCode)) {
            return new AuthResponse(false, "Invalid OTP");
        }
        
        // Find or create user
        User user = userRepository.findByEmail(email).orElse(null);
        
        if (user == null) {
            // Create new user for OTP login
            user = new User();
            user.setEmail(email);
            user.setName(email.split("@")[0]);
            user.setRole("CUSTOMER");
            user = userRepository.save(user);
        }
        
        String token = generateToken(user);
        UserDTO userDTO = new UserDTO(user.getId(), user.getEmail(), user.getName(), user.getRole());
        
        // Delete used OTP
        otpRepository.delete(otp);
        
        return new AuthResponse(true, "OTP verified successfully", token, userDTO);
    }
    
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) return null;
        return new UserDTO(user.getId(), user.getEmail(), user.getName(), user.getRole());
    }
    
    private String generateToken(User user) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        
        return Jwts.builder()
                .setSubject(user.getId().toString())
                .claim("email", user.getEmail())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
