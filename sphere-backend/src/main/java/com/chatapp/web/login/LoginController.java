package com.chatapp.web.login;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
@CrossOrigin(origins= "http://localhost:5173")
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;


    public LoginController(AuthenticationManager authenticationManager , JwtUtils jwtUtils) {

        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtils.generateJwtToken(userDetails.getUsername());
            JwtResponse jwtResponse = new JwtResponse();
            jwtResponse.setAccessToken(token);
            logger.info("jwtResponse: {}", jwtResponse.getAccessToken());
            return ResponseEntity.ok(jwtResponse);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Inavlid credentials");
        }
    }
}
