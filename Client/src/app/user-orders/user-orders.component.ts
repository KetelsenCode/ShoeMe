import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //We use ActivatedRoute cause it's a static route whereas ActivatedRouteSnapshot returns an observable so we can subscribe. Useful if url changes on same component
    //Fix this so it gets from order API with id as parameter. 
    let userIdParam = this.route.snapshot.paramMap.get("id");
    console.log(userIdParam);
  }

}
