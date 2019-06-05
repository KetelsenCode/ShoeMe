import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Item } from '../models/item';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  Cart: any = {}
  helper = new JwtHelperService();

  constructor(private HttpClient: HttpClient) { }

  getCartOnStart()
  {    
    var token = localStorage.getItem('token');
    var id = this.helper.decodeToken(token);    
    return this.HttpClient.get('http://localhost:5006/api/cart/' + id.nameid);
  }
  addItemToCart(item: CartItem)
  {
    return this.HttpClient.post('http://localhost:5006/api/cart/addItem', item);
  } 

  removeItem(id)
  {
    return this.HttpClient.post('http://localhost:5006/api/cart/removeItem', id)
  }
}
