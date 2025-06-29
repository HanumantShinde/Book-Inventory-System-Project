import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private loginUrl = 'http://localhost:8080/auth/login'; // Change this URL based on your backend
 private registerUrl = 'http://localhost:8080/auth/register';

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
}

   login(username: string, password: string): Observable<any> {
  return this.http.post(this.loginUrl, { username, password });
}

  register(data: any): Observable<any> {
  return this.http.post(this.registerUrl, data, { responseType: 'text' });
}

getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  }

}
