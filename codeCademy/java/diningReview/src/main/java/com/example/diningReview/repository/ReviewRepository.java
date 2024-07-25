package com.example.diningReview.repository;

import com.example.diningReview.model.Review;
import com.example.diningReview.model.ReviewStatus;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ReviewRepository extends CrudRepository<Review, Integer> {
  List<Review> findReviewsByRestaurantIdAndStatus(Long restaurantId, ReviewStatus status);
  List<Review> findReviewsByStatus(ReviewStatus status);
}
