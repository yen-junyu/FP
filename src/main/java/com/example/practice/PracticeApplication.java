package com.example.practice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling 
public class PracticeApplication {

	public static void main(String[] args) {
		System.out.println("hello");
		SpringApplication.run(PracticeApplication.class, args);
	}
	

}
