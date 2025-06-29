import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }


  getAllBook(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/allbooks`, {
      headers: this.getAuthHeaders()
    });
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/getbookbyid/${id}`, {
      headers: this.getAuthHeaders()
    });
  }


  addBook(book: Book): Observable<any> {
    return this.http.post(`${this.baseUrl}/addbooks`, book, {
      headers: this.getAuthHeaders()
    });
  }

  editBookById(id: number, book: Book): Observable<any> {
    return this.http.put(`${this.baseUrl}/editbookbyid/${id}`, book, {
      headers: this.getAuthHeaders()
    });
  }


  deleteBookById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletebookbyid/${id}`, {
      headers: this.getAuthHeaders()
    });
  }


  searchByAuthor(author: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books/search?author=${author}`, {
      headers: this.getAuthHeaders()
    });
  }


  filterByCategory(category: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books/filter?category=${category}`, {
      headers: this.getAuthHeaders()
    });
  }

  filterByPrice(minPrice: number, maxPrice: number): Observable<Book[]> {
  return this.http.get<Book[]>(
    `${this.baseUrl}/filterByPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`,
    { headers: this.getAuthHeaders() }
  );
}
}
