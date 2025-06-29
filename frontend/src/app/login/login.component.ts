import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
onLogin() {
  this.authService.login(this.username, this.password).subscribe({
    next: (response) => {
      // Save the token
      localStorage.setItem('token', response.token);

      // If backend returns role directly
      const role = response.role; // e.g., "LIBRARIAN" or "MEMBER"
      if (role) {
        localStorage.setItem('userRole', role);
      }

      // Redirect based on role
      if (role === 'LIBRARIAN') {
        this.router.navigate(['/librarian']);
      } else if (role === 'MEMBER') {
        this.router.navigate(['/member']);
      } else {
        this.router.navigate(['/unauthorized']);
      }
    },
    error: () => {
      this.errorMessage = 'Invalid username or password';
    }
  });
}
}
