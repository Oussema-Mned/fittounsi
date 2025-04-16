package com.esprit.workshop.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RoleBasedController {


    @GetMapping("/coach-only")
    public String coachOnlyRoute() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        return String.format("Hello %s! This route is accessible by Coach only.", username);
    }


    @GetMapping("/coach-client")
    public String coachAndClientRoute() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        return String.format("Hello %s! This route is accessible by both Coach and Client.", username);
    }
}
