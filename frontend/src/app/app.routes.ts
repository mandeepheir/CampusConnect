
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Signup } from './pages/signup/signup';
import { StudentRegister } from './pages/student-register/student-register';
import { EmployerRegister } from './pages/employer-register/employer-register';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'signup', component: Signup },
  { path: 'signup/student', component: StudentRegister },
  { path: 'signup/employer', component: EmployerRegister },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' }
];
