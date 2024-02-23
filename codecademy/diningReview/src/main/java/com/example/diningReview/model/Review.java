package com.example.diningReview.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name="Reviews")
public class Review {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "submittedBy")
    private String submittedBy;

    @Column(name = "restaurantId")
    private Long restaurantId;

    @Column(name = "peanutScore")
    private Integer peanutScore = null;

    @Column(name = "eggScore")
    private Integer eggScore = null;

    @Column(name = "diaryScore")
    private Integer diaryScore = null;

    @Column(name = "overallScore")
    private Integer overallScore = null;
}
