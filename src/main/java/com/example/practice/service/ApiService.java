package com.example.practice.service;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ApiService {

     private final RetryTemplate retryTemplate;
    private final RestTemplate restTemplate;

    public ApiService(RetryTemplate retryTemplate, RestTemplate restTemplate) {
        this.retryTemplate = retryTemplate;
        this.restTemplate = restTemplate;
    }

    public Optional<String> callExternalApi(String url) {
        return retryTemplate.execute(context -> {
            try {
                return Optional.of(executeApiCall(url));
            } catch (Exception e) {
                // 記錄錯誤或其他處理
                return Optional.empty();
            }
        });
    }

    private String executeApiCall(String url) throws Exception {
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new Exception("API 調用失敗，狀態碼: " + response.getStatusCode());
        }
        return response.getBody();
    }


}
