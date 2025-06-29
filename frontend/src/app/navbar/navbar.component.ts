import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  constructor(private authService: AuthService,private router: Router, private cdr: ChangeDetectorRef
) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    console.log('Logging out...');
    this.authService.logout();
     this.cdr.detectChanges(); // 🩺 forces change detection
    this.router.navigate(['/']); // ✅ redirect here explicitly
  }
}
