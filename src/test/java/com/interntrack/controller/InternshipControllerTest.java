package com.interntrack.controller;

import com.interntrack.entity.Internship;
import com.interntrack.service.InternshipService;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class InternshipControllerTest {

    @Test
    void getAllInternshipsShouldReturnInternships() {

        InternshipService service = new InternshipService(null) {
            @Override
            public List<Internship> getAllInternships() {
                return List.of(
                        new Internship(
                                "Google",
                                "Software Engineer Intern",
                                "Pune",
                                LocalDate.of(2026, 9, 27),
                                "Applied"
                        )
                );
            }
        };

        InternshipController controller = new InternshipController(service);

        ResponseEntity<List<Internship>> response =
                controller.getAllInternships();

        assertEquals(200, response.getStatusCode().value());
        assertEquals(1, response.getBody().size());
        assertEquals("Google", response.getBody().get(0).getCompanyName());
    }

    @Test
    void createInternshipShouldReturnCreatedInternship() {

        Internship internship = new Internship(
                "Microsoft",
                "Backend Developer Intern",
                "Bangalore",
                LocalDate.of(2026, 9, 27),
                "Interview"
        );

        InternshipService service = new InternshipService(null) {
            @Override
            public Internship createInternship(Internship input) {
                return input;
            }
        };

        InternshipController controller = new InternshipController(service);

        ResponseEntity<Internship> response =
                controller.createInternship(internship);

        assertEquals(201, response.getStatusCode().value());
        assertEquals("Microsoft", response.getBody().getCompanyName());
        assertEquals("Interview", response.getBody().getStatus());
    }
}
