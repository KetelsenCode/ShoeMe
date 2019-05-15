import { UserDetailsComponent } from './user-details/user-details.component';
import { ListShoesComponent } from './list-shoes/list-shoes.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UserDetailResolver } from './resolvers/user-details.resolver.service';

export const appRoutes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'shoes', component: ListShoesComponent},
    { path: 'user-details/:id', component:UserDetailsComponent,
            resolve: { data: UserDetailResolver},
            data: { resolvedata: 'user-details/:id'}},
    { path: '**', redirectTo: 'shoes', pathMatch: 'full' }
];
