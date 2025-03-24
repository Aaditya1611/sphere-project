package com.chatapp.web.signup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins= "http://localhost:5173")
public class SignupController {

    @Autowired
    private SendUserData sendUserData;
    
    @PostMapping("/signup")
    public String registerUser(@RequestBody UserInfo userInfo) {
        
        sendUserData.saveUserInfo(userInfo);
        return "Signup Successful";
    }
    
}
