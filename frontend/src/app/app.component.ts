import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'finalproject';
 private currentRoute: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      // Cast to Angular router event explicitly
      const routerEvent = event as RouterEvent;

      if (routerEvent instanceof NavigationStart) {
        const leavingLibrarian = this.currentRoute.startsWith('/librarian') && !routerEvent.url.startsWith('/librarian');
        const leavingMember = this.currentRoute.startsWith('/member') && !routerEvent.url.startsWith('/member');

        if (leavingLibrarian || leavingMember) {
          this.authService.logout();
        }
      }

      if (routerEvent instanceof NavigationEnd) {
        this.currentRoute = routerEvent.url;
      }
    });
  }
}


