import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CatalogService {

    constructor(private http: HttpClient) {}

    getItems()
    {
        return this.http.get('https://localhost:5002/api/items');
    }
}