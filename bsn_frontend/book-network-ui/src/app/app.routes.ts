import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { ActivateAccountComponent } from './Pages/activate-account/activate-account.component';
import { authGuard } from './services/guard/auth.guard';

export const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'activate-account',
        component: ActivateAccountComponent
    },
    {
        path: 'books',
        loadChildren: () => import('./Modules/book/book.module').then(m => m.BookModule),
        canActivate: [authGuard]
    }
];
