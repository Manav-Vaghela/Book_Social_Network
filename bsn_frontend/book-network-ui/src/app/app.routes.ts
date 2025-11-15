import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { ActivateAccountComponent } from './Pages/activate-account/activate-account.component';

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
    }
];
