import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { MemberComponent } from './member/member.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { memberGuard } from './auth/member.guard';         // ✅ add this
import { librarianGuard } from './auth/librarian.guard';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
   { path: 'login', component: LoginComponent },
  {
  path: 'librarian',
  loadComponent: () => import('./librarian/librarian.component').then(m => m.LibrarianComponent),
  canActivate: [AuthGuard],
  data: { roles: ['LIBRARIAN'] }
},
{
  path: 'member',
  loadComponent: () => import('./member/member.component').then(m => m.MemberComponent),
  canActivate: [AuthGuard],
  data: { roles: ['MEMBER'] }
},
{ path: 'unauthorized', component: UnauthorizedComponent },
{
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
{ path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
