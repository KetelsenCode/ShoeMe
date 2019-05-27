import { CartService } from './../services/cart.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class UserCartResolver implements Resolve<any> {
    constructor(private CartService: CartService, private route: Router) {}

    resolve(route: ActivatedRouteSnapshot) {
      return this.CartService.getCartOnStart();
    }
  }