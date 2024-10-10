package com.example.practice.schedule;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class ScheduledTasks {

     private static final Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);

    @PostConstruct
    public void init() {
        logger.info("ScheduledTasks component initialized");
    }

    // 3. 使用 Cron 表達式執行任務，這裡表示每分鐘的第0秒執行
    @Scheduled(cron = "${task.executionSchedule:*/1 * * * * ?}")
    public void scheduleTaskWithCronExpression() {
        System.out.println("hello");
        System.out.println("Cron 任務每分鐘的第0秒執行");
    }
}
