package com.example.diningReview.repository;

import com.example.diningReview.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}
