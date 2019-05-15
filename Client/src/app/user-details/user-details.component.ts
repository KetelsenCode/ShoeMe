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
  constructor(private route: ActivatedRoute, private AuthService: AuthService, private AlertifyService: AlertifyService) { }

  ngOnInit() {
    //Using + to cast it as an int
    this.AuthService.getUser(+this.route.snapshot.params['id']).subscribe((res) => {
      this.user = res;
      console.log(res);
      
    }, err => this.AlertifyService.error(err));
  }
}
