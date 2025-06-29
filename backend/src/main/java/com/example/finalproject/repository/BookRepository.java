package com.example.finalproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.finalproject.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book,Long>{

	List<Book> findByAuthorContainingIgnoreCase(String author);
    List<Book> findByCategoryContainingIgnoreCase(String category);
    List<Book> findByPriceBetween(double minPrice, double maxPrice);
}
