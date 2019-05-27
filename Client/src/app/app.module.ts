import { AuthGuard } from './guards/auth.guard';
import { UserCartResolver } from './resolvers/user-cart.resolver.service';
import { CatalogService } from './services/catalog.services';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './register/register.component';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { appRoutes } from './routes';
import { ListShoesComponent } from './list-shoes/list-shoes.component';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { AlertifyService } from './services/alertify.services';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDetailResolver } from './resolvers/user-details.resolver.service';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { ItemsResolver } from './resolvers/items.resolver.service';
import { DatePipe } from '@angular/common';
import { CartService } from './services/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    ListShoesComponent,
    UserDetailsComponent,
    UserOrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, CatalogService, ErrorInterceptorProvider, AlertifyService, UserDetailResolver, UserCartResolver, ItemsResolver, DatePipe, CartService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
