package com.Notification_System.services.dtos.user.responses;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AuthenticationResponse {

    private Integer id;
    private String email;
    private String token;

}
