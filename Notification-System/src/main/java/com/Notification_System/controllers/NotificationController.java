package com.Notification_System.controllers;

import com.Notification_System.services.abstracts.NotificationService;
import com.Notification_System.services.dtos.notification.requests.AddNotificationRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@AllArgsConstructor
@CrossOrigin
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("{id}")
    public ResponseEntity<Object> getUserNotifications(@RequestParam Integer id){
        return ResponseEntity.ok(notificationService.getAllNotification(id));
    }


    @GetMapping("/read")
    public ResponseEntity<Object> getNotificationByStatus(@RequestParam boolean isRead){
        return ResponseEntity.ok(notificationService.getAllNotificaionByStatus(isRead));
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestBody AddNotificationRequest request) throws Exception {
        notificationService.sendNotification(request);
        return ResponseEntity.ok("Successfull");
    }

    @PostMapping("{id}")
        public ResponseEntity<Object> changeReadStatus(@RequestParam Integer id){
            notificationService.changeReadStatus(id);
            return ResponseEntity.ok("Successful");
    }
}
