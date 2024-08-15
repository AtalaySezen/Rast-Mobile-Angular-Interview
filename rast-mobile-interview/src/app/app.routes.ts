import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './shared/auth/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'giris' },
    { path: 'anasayfa', component: HomeComponent, title: 'Anasayfa', canActivate: [authGuard] },
    { path: 'hakkimizda', component: AboutUsComponent, title: 'Hakkımızda', canActivate: [authGuard] },
    { path: 'giris', component: LoginComponent, title: 'Rast Mobile Angular Interview' },

];
