import { AlertifyService } from './../services/alertify.services';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any = {}
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //Data from the resolver - userdetails
    this.user = this.route.snapshot.data.data;
  }
}
