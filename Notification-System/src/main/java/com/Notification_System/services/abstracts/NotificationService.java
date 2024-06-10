package com.Notification_System.services.abstracts;

import com.Notification_System.entities.Notification;
import com.Notification_System.services.dtos.notification.requests.AddNotificationRequest;
import com.Notification_System.services.dtos.notification.responses.GetListNotificationResponse;

import java.util.List;

public interface NotificationService {

    Notification sendNotification(AddNotificationRequest request) throws Exception;

    Notification changeReadStatus(Integer id);

    List<GetListNotificationResponse> getAllNotification(Integer id);

    Notification findNotificationById(Integer id);

    List<GetListNotificationResponse> getAllNotificaionByStatus(boolean isRead);

}
