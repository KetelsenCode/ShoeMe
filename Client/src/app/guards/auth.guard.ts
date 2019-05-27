import { AuthService } from './../services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private AuthService: AuthService, private router: Router) {}
    canActivate(): boolean {
        if (this.AuthService.loggedIn()) {
            return true;
        }

        this.router.navigate(['/home']);
        return false;
    }
}