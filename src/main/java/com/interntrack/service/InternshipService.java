package com.interntrack.service;

import com.interntrack.entity.Internship;
import com.interntrack.repository.InternshipRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InternshipService {

    private final InternshipRepository internshipRepository;

    public InternshipService(InternshipRepository internshipRepository) {
        this.internshipRepository = internshipRepository;
    }

    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    public Optional<Internship> getInternshipById(Long id) {
        return internshipRepository.findById(id);
    }

    public Internship createInternship(Internship internship) {
        return internshipRepository.save(internship);
    }

    public Optional<Internship> updateInternship(Long id, Internship updatedInternship) {
        return internshipRepository.findById(id)
                .map(existing -> {
                    existing.setCompanyName(updatedInternship.getCompanyName());
                    existing.setJobRole(updatedInternship.getJobRole());
                    existing.setLocation(updatedInternship.getLocation());
                    existing.setApplicationDate(updatedInternship.getApplicationDate());
                    existing.setStatus(updatedInternship.getStatus());

                    return internshipRepository.save(existing);
                });
    }

    public boolean deleteInternship(Long id) {
        if (!internshipRepository.existsById(id)) {
            return false;
        }

        internshipRepository.deleteById(id);
        return true;
    }

    public List<Internship> searchByCompany(String company) {
        return internshipRepository.findByCompanyNameContainingIgnoreCase(company);
    }
}
