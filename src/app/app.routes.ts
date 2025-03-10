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
import { AdminReservationComponent } from './pages/admin/reservation/reservation.component';
import { UserShowComponent } from './pages/user/user-show/user-show.component';
import { BookingComponent } from './components/booking/booking.component';
import { authGuard } from './guards/auth.guard';
import { DataTableFilterComponent } from './components/data-table-filter/data-table-filter.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UserMoviesComponent } from './components/user-movies/user-movies.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', component: HomeComponent },
  {
    path: 'home',
    component: UserHomeComponent,
    canActivate: [authGuard],
    data: { roles: ['CUSTOMER'] },
  },
  { path: 'movies', component: UserMoviesComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'users', component: UserComponent },
      { path: 'movies', component: MovieComponent },
      { path: 'theaters', component: TheatersComponent },
      { path: 'reservation', component: AdminReservationComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ],
  },
  { path: 'theater-admin/:id', component: TheaterAdminComponent },
  { path: 'user', component: UserShowComponent },
  {
    path: 'show/:id',
    component: ShowComponent,
    canActivate: [authGuard],
    data: { roles: ['CUSTOMER'] },
  },
  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [authGuard],
    data: { roles: ['CUSTOMER'] },
  },
  {
    path: 'reservation/:id',
    component: ReservationComponent,
    canActivate: [authGuard],
    data: { roles: ['CUSTOMER'] },
  },
  {
    path: 'table',
    component: DataTableFilterComponent,
  },
  { path: 'usershow', component: UserShowComponent },
];
