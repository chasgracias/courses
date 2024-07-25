package com.example.diningReview.repository;

import com.example.diningReview.model.User;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
  Optional<User> findUserByDisplayName(String displayName);
}
