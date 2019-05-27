import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './../services/auth.service';
import { CartService } from './../services/cart.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  Cart: any = {};
  totalPrice: number = 0;
  userId;
  user: any = {};
  helper = new JwtHelperService();
  constructor(private route: ActivatedRoute, private AuthService: AuthService) { }

  ngOnInit() {
    //Gets users cart from resolver
    this.Cart = this.route.snapshot.data.data

    //Add a totalPrice attribute on item and populate it - afterwards populate full totalPrice (not pr item)
    this.Cart.items.forEach(item => {
      item.totalPrice = item.quantity * item.price;
      this.totalPrice += item.totalPrice;
    });

    //Get user from resolver
    this.user = this.route.snapshot.data.user;
 }

 order() {
   let newOrder: any = {};
   newOrder.user = this.user;
   newOrder.items = this.Cart.items;
   console.log("Successfully ordered to " + newOrder.user.username);

 }

}
