package com.bezkoder.spring.oracle.controller;

import java.io.IOException;
import java.util.Optional;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bezkoder.spring.oracle.model.Tutorial;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class test {
    @GetMapping("/testConnection")
    public Object test() {
        String server = "127.0.0.1";
        int port = 2223; // Default FTP port
        String user = "miles";
        String pass = "123456";

        FTPClient ftpClient = new FTPClient();

        try {
            // Connect to the FTP server
            ftpClient.connect(server, port);

            // Log in to the FTP server
            ftpClient.login(user, pass);

            // Set file transfer mode to binary
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            // Print the current working directory
            System.out.println("Current directory: " + ftpClient.printWorkingDirectory());

            // List the files in the current directory
            String[] files = ftpClient.listNames();
            if (files != null) {
                System.out.println("Files in the current directory:");
                for (String file : files) {
                    System.out.println(file);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                // Disconnect from the FTP server
                ftpClient.disconnect();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return "123";
    }
}
