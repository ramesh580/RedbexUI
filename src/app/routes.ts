import { Routes } from '@angular/router';
import { LoginComponent } from './Modules/login/login.component';
import { DashboardComponent } from './Modules/dashboard/dashboard.component';
import { AuthGuard } from './Auth/auth.guard';

export const appRoutes:Routes=[
    {
        path:'login', component:LoginComponent
    },
    {
        path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]
    }, 
    {
        path:'', redirectTo:'/login', pathMatch:'full'
    }
];