import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone :true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = 'MEMBER'; // default role
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

 register(): void {
  const userData = {
    username: this.username,
    password: this.password,
    role: this.role.toUpperCase()  // Ensure role is in ALL CAPS
  };

  this.authService.register(userData).subscribe({
   next: (res) => {
  console.log('✅ Success:', res); // Optional debug
  this.errorMessage = '';
  this.successMessage = '✅ Registered successfully! Redirecting to login...';
  setTimeout(() => this.router.navigate(['/login']), 2000);
},
error: (err) => {
  this.successMessage = '';
  this.errorMessage = '❌ Registration failed. Try again.';
}
  });
}}
