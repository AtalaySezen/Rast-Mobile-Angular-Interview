import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './shared/auth/auth.guard';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent, title: 'Anasayfa', canActivate: [authGuard] },
    { path: 'about-us', component: AboutUsComponent, title: 'Hakkımızda', canActivate: [authGuard] },
    { path: 'login', component: LoginComponent, title: 'Rast Mobile Angular Login' },
    { path: 'register', component: RegisterComponent, title: 'Rast Mobile Angular Register' },
];
