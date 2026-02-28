package com.salmik.authservice.controller;

import com.salmik.authservice.dto.AuthRequest;
import com.salmik.authservice.dto.AuthResponse;
import com.salmik.authservice.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final AuthService authService;
    
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    
    @PostMapping
    public ResponseEntity<AuthResponse> handleAuth(@RequestBody AuthRequest request) {
        String action = request.getAction();
        
        switch (action) {
            case "register":
                return ResponseEntity.ok(authService.register(
                        request.getEmail(),
                        request.getPassword(),
                        request.getName()
                ));
            
            case "login":
                return ResponseEntity.ok(authService.login(
                        request.getEmail(),
                        request.getPassword()
                ));
            
            case "send-otp":
                return ResponseEntity.ok(authService.sendOtp(
                        request.getEmail(),
                        "LOGIN"
                ));
            
            case "verify-otp":
                return ResponseEntity.ok(authService.verifyOtp(
                        request.getEmail(),
                        request.getPassword(), // Using password field for OTP
                        "LOGIN"
                ));
            
            default:
                return ResponseEntity.badRequest()
                        .body(new AuthResponse(false, "Invalid action"));
        }
    }
    
    @PostMapping("/send-otp")
    public ResponseEntity<AuthResponse> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String purpose = request.getOrDefault("purpose", "LOGIN");
        return ResponseEntity.ok(authService.sendOtp(email, purpose));
    }
    
    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponse> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        String purpose = request.getOrDefault("purpose", "LOGIN");
        return ResponseEntity.ok(authService.verifyOtp(email, otp, purpose));
    }
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(authService.register(
                request.get("email"),
                request.get("password"),
                request.get("name")
        ));
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(authService.login(
                request.get("email"),
                request.get("password")
        ));
    }
}
