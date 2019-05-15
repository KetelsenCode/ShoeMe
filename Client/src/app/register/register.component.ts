import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {};
  constructor(private AuthService: AuthService) { }

  ngOnInit() {
  }

  register()
  {
      this.AuthService.register(this.user).subscribe(r => { console.log(r)} , err => { console.log(err)})
  }

}
