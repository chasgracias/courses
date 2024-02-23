package com.example.diningReview.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name="Restaurants")
public class Restaurant {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="peanutScore")
    private Integer peanutScore = null;

    @Column(name="eggScore")
    private Integer eggScore = null;

    @Column(name="dairyScore")
    private Integer dairyScore = null;

    @Column(name="overallScore")
    private Integer overallScore = null;
}
