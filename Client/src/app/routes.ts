import { AuthGuard } from './guards/auth.guard';
import { UserCartResolver } from './resolvers/user-cart.resolver.service';
import { ItemsResolver } from './resolvers/items.resolver.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ListShoesComponent } from './list-shoes/list-shoes.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UserDetailResolver } from './resolvers/user-details.resolver.service';
import { UserOrdersComponent } from './user-orders/user-orders.component';

export const appRoutes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'shoes', component: ListShoesComponent,
            resolve: { data: ItemsResolver }},
    { path: 'user-details/:id', component:UserDetailsComponent,
            resolve: { data: UserDetailResolver},
            data: { resolvedata: 'user-details/:id'}, canActivate: [AuthGuard]},
    { path: 'user-orders/:id', component: UserOrdersComponent,
             resolve: { data: UserCartResolver,
                        user: UserDetailResolver}, canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'shoes', pathMatch: 'full' }
];
