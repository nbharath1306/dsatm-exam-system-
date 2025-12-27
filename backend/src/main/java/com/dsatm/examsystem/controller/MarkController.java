package com.dsatm.examsystem.controller;

import com.dsatm.examsystem.model.Mark;
import com.dsatm.examsystem.service.MarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin(origins = "*")
public class MarkController {
    @Autowired
    private MarkService markService;

    @GetMapping
    public List<Mark> getAllMarks() {
        return markService.getAllMarks();
    }

    @GetMapping("/{id}")
    public Optional<Mark> getMarkById(@PathVariable Long id) {
        return markService.getMarkById(id);
    }

    @PostMapping
    public Mark createMark(@RequestBody Mark mark) {
        return markService.saveMark(mark);
    }

    @PutMapping("/{id}")
    public Mark updateMark(@PathVariable Long id, @RequestBody Mark mark) {
        mark.setId(id);
        return markService.saveMark(mark);
    }

    @DeleteMapping("/{id}")
    public void deleteMark(@PathVariable Long id) {
        markService.deleteMark(id);
    }
}
