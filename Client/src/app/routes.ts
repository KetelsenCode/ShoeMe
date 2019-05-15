import { ListShoesComponent } from './list-shoes/list-shoes.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

export const appRoutes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'shoes', component: ListShoesComponent},
    { path: '**', redirectTo: 'shoes', pathMatch: 'full' }
];
