package com.example.finalproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.finalproject.model.Book;
import com.example.finalproject.repository.BookRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class BookController {

	@Autowired
	private BookRepository bookRepository;
	
	@GetMapping("/allbooks")
	List<Book> getAllBooks() {
	  return bookRepository.findAll();
	  }
	
	
	@GetMapping("/getbookbyid/{id}")
	Book getOneBookById(@PathVariable Long id){
		return bookRepository.findById(id).get();	
		}
	
	
	@PostMapping("addbooks")
	public void addBooks(@RequestBody Book b) {
	    bookRepository.save(b); 
	}
	
	@PutMapping("editbookbyid/{id}")
	void editBooks(@PathVariable Long id ,@RequestBody Book bo) {
	Book  b=bookRepository.findById(id).get();
	b.setTitle(bo.getTitle());
	b.setAuthor(bo.getAuthor());
	b.setCategory(bo.getCategory());
	b.setQuantity(bo.getQuantity());
	b.setPrice(bo.getPrice());
	bookRepository.save(b);
}
	
	
	@DeleteMapping("deletebookbyid/{id}")
	void deleteBook(@PathVariable Long id) {
		bookRepository.deleteById(id);
	}
	
	 
    @GetMapping("/books/search")
    public List<Book> searchByAuthor(@RequestParam String author) {
        return bookRepository.findByAuthorContainingIgnoreCase(author);
    }

  
    @GetMapping("/books/filter")
    public List<Book> filterByCategory(@RequestParam String category) {
        return bookRepository.findByCategoryContainingIgnoreCase(category);
    }
    
    @GetMapping("/filterByPrice")
    public List<Book> filterBooksByPrice(
            @RequestParam double minPrice,
            @RequestParam double maxPrice) {
        return bookRepository.findByPriceBetween(minPrice, maxPrice);
    }
	}
