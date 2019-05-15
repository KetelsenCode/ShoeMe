import { AlertifyService } from './../services/alertify.services';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {};
  constructor(private AuthService: AuthService, private AlertifyService: AlertifyService) { }

  ngOnInit() {
  }

  register()
  {
      this.AuthService.register(this.user).subscribe((res) => { 
        this.AlertifyService.success('User registred');
      } , err => { this.AlertifyService.warning(err)})
  }

}
