package com.Notification_System.services.concretes;

import com.Notification_System.core.utilities.mappers.ModelMapperService;
import com.Notification_System.entities.Notification;
import com.Notification_System.entities.User;
import com.Notification_System.repositories.NotificationRepository;
import com.Notification_System.services.abstracts.NotificationService;
import com.Notification_System.services.abstracts.UserService;
import com.Notification_System.services.dtos.notification.requests.AddNotificationRequest;
import com.Notification_System.services.dtos.notification.responses.GetListNotificationResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class NotificationManager implements NotificationService {


    private final UserService userService;
    private final NotificationRepository notificationRepository;
    private final ModelMapperService modelMapperService;

    @Override
    public Notification sendNotification(AddNotificationRequest request) throws Exception {
        User user = userService.checkUserEmail(request.getEmail());
        Notification notification = this.modelMapperService.forRequest()
                    .map(request,Notification.class);
        notification.setUser(user);
        notificationRepository.save(notification);
        return notification;
    }

    @Override
    public Notification changeReadStatus(Integer id) {
         Notification notification = findNotificationById(id);
         boolean currentStatus = !notification.isRead();
         notification.setRead(currentStatus);
         notificationRepository.save(notification);
         return notification;
    }

    @Override
    public List<GetListNotificationResponse> getAllNotification(Integer id) {
        User user = userService.findUserById(id);
        List<Notification> notif = notificationRepository.findAllNotifications(user.getId());
        var result = notif.stream()
                    .map(n -> modelMapperService.forResponse()
                            .map(n, GetListNotificationResponse.class))
                    .collect(Collectors.toList());
        return result;
    }

    @Override
    public Notification findNotificationById(Integer id) {
        Optional<Notification> notification = notificationRepository.findById(id);
        if(notification.isPresent()){
            return notification.get();
        }
        throw new RuntimeException("Id is not found");
    }

    @Override
    public List<GetListNotificationResponse> getAllNotificaionByStatus(boolean isRead) {
        List<Notification> notif = notificationRepository.findNotificationByIsRead(isRead);
        var result = notif.stream()
                .map(n-> modelMapperService.forResponse()
                        .map(n, GetListNotificationResponse.class)).toList();
        return result;
    }
}
