package com.Notification_System.services.abstracts;

import com.Notification_System.entities.User;
import com.Notification_System.services.dtos.user.requests.AuthenticationRequest;
import com.Notification_System.services.dtos.user.requests.RegisterRequest;
import com.Notification_System.services.dtos.user.responses.AuthenticationResponse;

public interface UserService {

    AuthenticationResponse register(RegisterRequest registerRequest);

    AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);

    User checkUserEmail(String email) throws Exception;

    User  findUserById (Integer id);



}
