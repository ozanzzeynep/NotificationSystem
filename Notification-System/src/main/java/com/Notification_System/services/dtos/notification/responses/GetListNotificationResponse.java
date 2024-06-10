package com.Notification_System.services.dtos.notification.responses;

import com.Notification_System.services.dtos.user.responses.AuthenticationResponse;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class GetListNotificationResponse {


    private Integer id;

    private AuthenticationResponse response;

    private String context;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime createdDate;

    private boolean isRead;

}