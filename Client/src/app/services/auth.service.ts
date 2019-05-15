import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService} from '@auth0/angular-jwt'
@Injectable({
    providedIn: 'root'
})

export class AuthService {
    jwtHelper = new JwtHelperService();
    constructor(private HttpClient: HttpClient) { }

    login(user: any) {
        //Returns our JWT token
        return this.HttpClient.post('http://localhost:5000/api/auth/login', user);
    }

    loggedIn() {
        //returns true if token isnt expired
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }

    register(user: any) {
        return this.HttpClient.post('http://localhost:5000/api/auth/register', user);
    }

    getValue() {
        let token = localStorage.getItem('token');
        let headers: HttpHeaders = new HttpHeaders();
        console.log(token);
        headers = headers.append('Authorization','Bearer ' + token);
        return this.HttpClient.get('http://localhost:5000/api/values', {headers});
    }
}