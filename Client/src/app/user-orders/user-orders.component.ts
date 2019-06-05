import { CartItem } from './../models/cart';
import { AlertifyService } from './../services/alertify.services';
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
  //Total price for alle items in cart
  totalPrice: number = 0;
  userId;
  user: any = {};
  helper = new JwtHelperService();
  constructor(private route: ActivatedRoute, private AuthService: AuthService, private CartService: CartService, private AlertifyService: AlertifyService) { }

  ngOnInit() {
    //Gets users cart from resolver
    this.Cart = this.route.snapshot.data.data
    console.log(this.Cart);

    //Add a totalPrice attribute on item and populate it - afterwards populate full totalPrice (not pr item)
    this.Cart.items.forEach(item => {
      item.totalPrice = item.quantity * item.price;
      this.totalPrice += item.totalPrice;
    });

    //Get user from resolver
    this.user = this.route.snapshot.data.user;
 }

 //Prints out the order. Normally we'd call our Order service here but I didn't get any further
 order() {
   let newOrder: any = {};
   newOrder.user = this.user;
   newOrder.items = this.Cart.items;
   console.log("Successfully ordered to " + newOrder.user.username);
 }

 removeItem(id, item: CartItem) {
   this.CartService.removeItem(id).subscribe(res => {
     this.AlertifyService.success('Item deleted');

     // This part removes the item object for the Cart.items array so we can update our template page. 
     const index = this.Cart.items.indexOf(item);
     this.Cart.items.splice(index, 1);
   }, err => {
     this.AlertifyService.error('Something went wrong!')
   });
 }

}
