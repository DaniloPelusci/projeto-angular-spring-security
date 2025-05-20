import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {authGuard} from './auth/auth.guard';
import {HomeComponent} from './components/home/home.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]
  }
];
