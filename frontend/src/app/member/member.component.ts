import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-member',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit {

  books: Book[] = [];
  selectedBook: Book | null = null;
  minPrice: number = 0;
  maxPrice: number = 10000;
  purchaseQuantity: number = 1;
   showBuyModal: boolean = false;

  @ViewChild('buyBookTemplate') buyBookTemplate!: TemplateRef<any>;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
  this.loadAllBooks();

  const modalEl = document.getElementById('bookModal');
  if (modalEl) {
    modalEl.addEventListener('hidden.bs.modal', () => {
      this.selectedBook = null;
    });
  }
}

  loadAllBooks(): void {
    this.bookService.getAllBook().subscribe({
      next: data => this.books = data,
      error: err => console.error('Error loading books', err)
    });
  }

  searchByAuthor(author: string): void {
    if (!author.trim()) return;
    this.bookService.searchByAuthor(author).subscribe({
      next: data => this.books = data,
      error: err => console.error('Author search failed', err)
    });
  }

  filterByCategory(category: string): void {
    if (!category.trim()) return;
    this.bookService.filterByCategory(category).subscribe({
      next: data => this.books = data,
      error: err => console.error('Category filter failed', err)
    });
  }

  filterByPrice(): void {
    if (this.minPrice != null && this.maxPrice != null) {
      this.bookService.filterByPrice(this.minPrice, this.maxPrice).subscribe({
        next: data => this.books = data,
        error: err => console.error('Price filter failed', err)
      });
    }
  }

  trackByBookId(index: number, book: Book): number {
    return book.id ?? index;
  }

showSeeModal: boolean = false; // NEW

openBookModal(book: Book): void {
  this.selectedBook = book;
  this.showSeeModal = true;
}

closeSeeModal(): void {
  this.showSeeModal = false;
  this.selectedBook = null;
}

 openBuyModal(book: Book): void {
    this.selectedBook = book;
    this.purchaseQuantity = 1;
    this.showBuyModal = true;
  }

  closeModal(): void {
    this.showBuyModal = false;
    this.selectedBook = null;
  }

  confirmPurchase(): void {
    if (!this.selectedBook) return;

    const quantity = this.selectedBook.quantity ?? 0;
    const price = this.selectedBook.price ?? 0;

    if (this.purchaseQuantity < 1 || this.purchaseQuantity > quantity) {
      alert("Invalid purchase quantity.");
      return;
    }

    const total = this.purchaseQuantity * price;
    alert(`You bought ${this.purchaseQuantity} copy(ies) of "${this.selectedBook.title}". Total: ₹${total}`);
    this.selectedBook.quantity -= this.purchaseQuantity;
    this.closeModal();
  }
}
