package com.Notification_System.repositories;

import com.Notification_System.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Integer> {

    @Query("SELECT n FROM Notification n WHERE n.user.id = :userId")
    List<Notification> findAllNotifications(@Param("userId") Integer userId);


    List<Notification> findNotificationByIsRead(boolean isRead);
}
