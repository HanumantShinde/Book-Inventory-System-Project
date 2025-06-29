import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-librarian',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './librarian.component.html',
  styleUrl: './librarian.component.css'
})
export class LibrarianComponent implements OnInit {

  books: Book[] = [];
  bookForm: FormGroup;
  editingBookId: number | null = null;
  minPrice: number = 0;
   maxPrice: number = 10000;

  constructor(private bookService: BookService, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: [''],
      author: [''],
      category: [''],
      quantity: [''],
       price: ['']
    });
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBook().subscribe(data => {
      this.books = data;
    });
  }

  submitBook(): void {
    const book: Book = this.bookForm.value;
    if (this.editingBookId) {
      this.bookService.editBookById(this.editingBookId, book).subscribe(() => {
        this.loadBooks();
        this.bookForm.reset();
        this.editingBookId = null;
      });
    } else {
      this.bookService.addBook(book).subscribe(() => {
        this.loadBooks();
        this.bookForm.reset();
      });
    }
  }

  editBook(book: Book): void {
  if (book.id != null) {  // Check if id is defined
    this.editingBookId = book.id;
    this.bookForm.setValue({
      title: book.title,
      author: book.author,
      category: book.category,
      quantity: book.quantity,
      price: book.price
    });
  }
}

  deleteBook(id: number): void {
    if (confirm('Are you sure to delete this book?')) {
      this.bookService.deleteBookById(id).subscribe(() => {
        this.loadBooks();
      });
    }
  }

  searchAuthor(author: string): void {
    this.bookService.searchByAuthor(author).subscribe(data => {
      this.books = data;
    });
  }

  filterCategory(category: string): void {
    this.bookService.filterByCategory(category).subscribe(data => {
      this.books = data;
    });
  }

  resetForm(): void {
    this.bookForm.reset();
    this.editingBookId = null;
  }

  trackByBookId(index: number, book: Book): number {
  return book.id ?? index; // Fallback to index if id is undefined
}

filterByPrice(): void {
  if (this.minPrice != null && this.maxPrice != null) {
    this.bookService.filterByPrice(this.minPrice, this.maxPrice).subscribe(
      data => this.books = data,
      error => console.error(error)
    );
  }
}

getTotalQuantity(): number {
  return this.books.reduce((total, b) => total + (b.quantity || 0), 0);
}

getTotalInventoryValue(): number {
  return this.books.reduce((total, b) => total + ((b.quantity || 0) * (b.price || 0)), 0);
}


}
