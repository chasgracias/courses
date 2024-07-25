package com.example.diningReview.repository;

import com.example.diningReview.model.Restaurant;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface RestaurantRepository extends CrudRepository<Restaurant, Integer> {
  Optional<Restaurant> findRestaurantsByNameAndZipCode(String name, Integer zipcode);
  List<Restaurant> findRestaurantsByZipCodeAndPeanutScoreNotNull(Integer zipcode);
  List<Restaurant> findRestaurantsByZipCodeAndDiaryScoreNotNull(Integer zipcode);
  List<Restaurant> findRestaurantsByZipCodeAndEggScoreNotNull(Integer zipcode);
}
