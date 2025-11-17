package com.bezkoder.spring.oracle.cronjob;

import java.util.HashMap;
import java.util.Map;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.bezkoder.spring.oracle.service.CacheService;

@Component
public class CacheUpdateJob {

    private final CacheService cacheService;

    public CacheUpdateJob(CacheService cacheService) {
        this.cacheService = cacheService;
    }

    @Scheduled(cron = "0 */1 * * * *")
    public void heelos() {
        System.out.println("CacheUpdateJob triggered");
    }

    // 每 10 分鐘執行一次（你可以改成自己的 cron）
    @Scheduled(cron = "*/10 * * * * *")
    public void refreshCache() {
        System.out.println("Running cache update job...");

        Map<String, String> newData = new HashMap<>();
        newData.put("timestamp", String.valueOf(System.currentTimeMillis()));
        newData.put("data", "example");

        cacheService.updateCache(newData);
    }
}