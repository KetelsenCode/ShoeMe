import { AlertifyService } from './../services/alertify.services';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  constructor(private route: ActivatedRoute, private AuthService: AuthService, private datepipe: DatePipe) { }

  ngOnInit() {
    
    //Data from the resolver - userdetails
    this.user = this.route.snapshot.data.data;

    //Can't get date to autifill
    var date = this.datepipe.transform(this.user.dateOfBirth, 'dd-MM-yyyy')
    this.registerForm = new FormGroup({
        birthday: new FormControl(date),
        email: new FormControl(this.user.mail),
        phone: new FormControl(this.user.phoneNumber),
        streetName: new FormControl(this.user.streetName),
        streetNr: new FormControl(this.user.streetNr),
        postCode: new FormControl(this.user.postCode),
        city: new FormControl(this.user.city),
        country: new FormControl(this.user.country)
        
    })
  }

  changeDetails()
  {
    this.user = {
      id: this.user.id,
      username: this.user.username,
      lastLogin: this.user.lastLogin,
      dateOfBirth: this.registerForm.get('birthday').value,
      phoneNumber: this.registerForm.get('phone').value,
      mail: this.registerForm.get('email').value,
      streetName: this.registerForm.get('streetName').value,
      streetNr: this.registerForm.get('streetNr').value,
      postCode: this.registerForm.get('postCode').value,
      city: this.registerForm.get('city').value,
      country: this.registerForm.get('country').value,
      createdAt: Date.now()
    }
    this.AuthService.changeDetails(this.user).subscribe(res => console.log(res));
  }
}
