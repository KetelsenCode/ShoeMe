import { AlertifyService } from './../services/alertify.services';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = {}
  decodedToken;
  jwtHelper = new JwtHelperService();
  constructor(private AuthService: AuthService, private router: Router, private Alertify: AlertifyService) { }

  ngOnInit() {
    //So if user updates page - we're still getting the user to our navbar.
    if (this.AuthService.loggedIn()){
      this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    }
  }

  login() {
    this.AuthService.login(this.user).subscribe((token: any )=> { 
                    localStorage.setItem('token', token.token)
                    this.decodedToken = this.jwtHelper.decodeToken(token.token);
                    console.log(this.decodedToken.nameid);
                    this.Alertify.success('User succesfully logged in!');
                 }, 
      err => { this.Alertify.error("Username or password incorrect") });
  }

  logout() {
    this.user.username = '';
    this.user.password = '';
    localStorage.removeItem('token');
    this.Alertify.message("User logged out");
    this.router.navigate(['/shoes']);
  }

  loggedIn() {
    return this.AuthService.loggedIn();
  }


}
