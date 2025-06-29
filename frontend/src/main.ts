import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Make sure this file exports your routes

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // ✅ Add router
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
});
