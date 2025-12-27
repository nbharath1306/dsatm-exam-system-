package com.dsatm.examsystem.service;

import com.dsatm.examsystem.model.Mark;
import com.dsatm.examsystem.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarkService {
    @Autowired
    private MarkRepository markRepository;

    public List<Mark> getAllMarks() {
        return markRepository.findAll();
    }

    public Optional<Mark> getMarkById(Long id) {
        return markRepository.findById(id);
    }

    public Mark saveMark(Mark mark) {
        // Category-based logic: if subject is IPCC, both theory and practical marks are required
        // If PCC, only theoryMarks is required
        if (mark.getSubject() != null && mark.getSubject().getCategory() != null) {
            String category = mark.getSubject().getCategory();
            if ("IPCC".equalsIgnoreCase(category)) {
                if (mark.getTheoryMarks() == null || mark.getPracticalMarks() == null) {
                    throw new IllegalArgumentException("Both theory and practical marks are required for IPCC subjects.");
                }
            } else {
                if (mark.getTheoryMarks() == null) {
                    throw new IllegalArgumentException("Theory marks are required for PCC subjects.");
                }
                mark.setPracticalMarks(null); // Ensure practical is not set for PCC
            }
        }
        return markRepository.save(mark);
    }

    public void deleteMark(Long id) {
        markRepository.deleteById(id);
    }
}
