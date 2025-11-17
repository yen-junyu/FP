package com.bezkoder.spring.oracle.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicReference;
import java.util.Map;
import java.util.HashMap;

@Service
public class CacheService {

    // 你也可以用 ConcurrentHashMap，看資料型態決定
    private final AtomicReference<Map<String, String>> cache =
            new AtomicReference<>(new HashMap<>());

    public Map<String, String> getCache() {
        return cache.get();
    }

    public void updateCache(Map<String, String> newData) {
        cache.set(newData);
    }
}
