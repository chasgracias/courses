package com.example.diningReview.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Restaurant {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private Integer zipcode;

    private Integer peanutScore = null;
    private Integer eggScore = null;
    private Integer dairyScore = null;
    private Integer overallScore = null;
}
