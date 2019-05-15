import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';

import { Resolve, ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class UserDetailResolver implements Resolve<any> {
  constructor(private AuthService: AuthService, private route: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    //user-details/2. url[0] would be user-details, [1] is after /
    let userIdParam = route.url[1].path;
    return this.AuthService.getUser(userIdParam);
  }
}