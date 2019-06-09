import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService} from '@auth0/angular-jwt'
import { User } from '../models/user';
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

    getUser(id) {
        let token = localStorage.getItem('token');
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization','Bearer ' + token);
        return this.HttpClient.get('http://localhost:5000/api/auth/user-details/' + id,  {headers});
    }

    changeDetails(user: User)
    {
        let token = localStorage.getItem('token');
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization','Bearer ' + token);        
                                                                                 //url query parameter, http req body, http req header
        return this.HttpClient.put('http://localhost:5000/api/auth/user-details/' + user.id, user,  {headers})
    }
}