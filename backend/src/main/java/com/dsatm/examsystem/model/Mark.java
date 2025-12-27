package com.dsatm.examsystem.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    // For PCC: only theoryMarks is used
    // For IPCC: both theoryMarks and practicalMarks are used
    private Integer theoryMarks;
    private Integer practicalMarks;
}
