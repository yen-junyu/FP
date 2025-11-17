package com.bezkoder.spring.oracle.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bezkoder.spring.oracle.service.CacheService;

@RestController
public class CacheController {

    private final CacheService cacheService;

    public CacheController(CacheService cacheService) {
        this.cacheService = cacheService;
    }

    @GetMapping("/cache")
    public Map<String, String> getCache() {
        return cacheService.getCache();
    }
}
