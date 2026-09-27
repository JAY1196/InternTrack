package com.interntrack.repository;

import com.interntrack.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Long> {

    List<Internship> findByCompanyNameContainingIgnoreCase(String companyName);
}
