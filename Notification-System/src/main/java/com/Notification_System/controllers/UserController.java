package com.Notification_System.controllers;

import com.Notification_System.services.abstracts.UserService;
import com.Notification_System.services.dtos.user.requests.AuthenticationRequest;
import com.Notification_System.services.dtos.user.requests.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserService userService;
    @PostMapping("/register")
    public ResponseEntity<Object> register(
            @RequestBody RegisterRequest request){
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/authenticate")
    @ExceptionHandler(HttpMediaTypeNotAcceptableException.class)
    public ResponseEntity<Object> authenticate(
            @RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(userService.authenticate(request));

    }
}
