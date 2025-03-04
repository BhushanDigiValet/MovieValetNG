import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/admin/user/user.component';
import { MovieComponent } from './pages/admin/movie/movie.component';
import { TheatersComponent } from './pages/admin/theaters/theaters.component';
import { TheaterAdminComponent } from './pages/theater-admin/theater-admin.component';
import { HomeComponent } from './components/home/home.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { ShowComponent } from './components/show/show.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UserShowComponent } from './pages/user/user-show/user-show.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: UserHomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'users', component: UserComponent },
      { path: 'movies', component: MovieComponent },
      { path: 'theaters', component: TheatersComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ],
  },
  { path: 'theater-admin/:id', component: TheaterAdminComponent },
  {path: 'user', component: UserShowComponent},
  { path: 'show/:id', component: ShowComponent },
  { path: 'reservation/:id', component: ReservationComponent },
];
