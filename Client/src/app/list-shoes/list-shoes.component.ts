import { AuthService } from './../services/auth.service';
import { CartService } from './../services/cart.service';
import { Item } from './../models/item';
import { CatalogService } from './../services/catalog.services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CartItem } from '../models/cart';

@Component({
  selector: 'app-list-shoes',
  templateUrl: './list-shoes.component.html',
  styleUrls: ['./list-shoes.component.css']
})
export class ListShoesComponent implements OnInit {
  items: Item[];
  cart: any = {}
  helper = new JwtHelperService();
  constructor(private CatalogService: CatalogService, private route: ActivatedRoute, private CartService: CartService, private AuthService: AuthService) { }

  ngOnInit() {
    if (this.AuthService.loggedIn()) {
      this.CartService.getCartOnStart().subscribe(res => this.cart = res);
    }
    this.CatalogService.getItems().subscribe((res: any) => this.items = res);
  }

  addItemToCart(item: Item)
  {
      var cartItem: CartItem = {
        productname: item.name,
        price: item.price,
        quantity: 1,
        pictureurl: item.photo,
        cartid: this.cart.id
      };
      
      this.CartService.addItemToCart(cartItem).subscribe(res => console.log(res));
  }

}
