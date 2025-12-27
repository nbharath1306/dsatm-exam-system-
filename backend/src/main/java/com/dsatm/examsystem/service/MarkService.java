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
        return markRepository.save(mark);
    }

    public void deleteMark(Long id) {
        markRepository.deleteById(id);
    }
}
