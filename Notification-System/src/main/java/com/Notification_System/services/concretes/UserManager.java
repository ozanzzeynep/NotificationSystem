package com.Notification_System.services.concretes;

import com.Notification_System.core.services.JwtService;
import com.Notification_System.entities.User;
import com.Notification_System.repositories.UserRepository;
import com.Notification_System.services.abstracts.UserService;
import com.Notification_System.services.dtos.user.requests.AuthenticationRequest;
import com.Notification_System.services.dtos.user.requests.RegisterRequest;
import com.Notification_System.services.dtos.user.responses.AuthenticationResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserManager implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        User user = checkUserEmail(request.getEmail());
        var newUser = User.builder()
                    .nameSurname(request.getNameSurname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .build();
        userRepository.save(newUser);
        var jwtToken = jwtService.generateToken(newUser);
        return AuthenticationResponse.builder()
                    .id(newUser.getId())
                    .email(newUser.getEmail())
                    .token(jwtToken)
                    .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findUserByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .token(jwtToken)
                .build();
    }

    @Override
    public User checkUserEmail(String email) {
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isPresent()){
            return user.get();
        }
        throw new RuntimeException("Email is not found");
    }

    @Override
    public User findUserById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return user.get();
        }
        throw new RuntimeException("User is not found");
    }
}
