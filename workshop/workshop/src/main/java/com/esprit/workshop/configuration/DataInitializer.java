package com.esprit.workshop.configuration;


import com.esprit.workshop.model.Role;
import com.esprit.workshop.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {
    @Autowired
    private RoleRepository roleRepository;

    @PostConstruct
    public void init() {
        if (roleRepository.findByName("COACH").isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("COACH");
            roleRepository.save(adminRole);
        }

        if (roleRepository.findByName("CLIENT").isEmpty()) {
            Role userRole = new Role();
            userRole.setName("CLIENT");
            roleRepository.save(userRole);
        }
    }
}
