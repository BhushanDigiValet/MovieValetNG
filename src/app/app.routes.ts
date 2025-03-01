import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/admin/user/user.component';
import { MovieComponent } from './pages/admin/movie/movie.component';
import { TheatersComponent } from './pages/admin/theaters/theaters.component';
import { TheaterAdminComponent } from './pages/admin/theater-admin/theater-admin.component';

export const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'users', component: UserComponent },
      { path: 'movies', component: MovieComponent },
      { path: 'theaters', component: TheatersComponent },
      { path: 'theater-admin', component: TheaterAdminComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' }, // Default child route
    ],
  },
];
