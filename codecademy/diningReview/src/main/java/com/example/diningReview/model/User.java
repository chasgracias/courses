package com.example.diningReview.model;

import jakarta.persistence.*;

@Entity
@Table(name="Users")
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name="displayName", unique = true)
    private String displayName;

    private String city;
    private String state;
    private Integer zipcode;
    private Boolean interestInPeanutAllergies;
    private Boolean interestInEggAllergies;
    private Boolean interestInDiaryAllergies;

}
