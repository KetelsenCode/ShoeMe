import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CatalogService } from './../services/catalog.services';

@Injectable()
export class ItemsResolver implements Resolve<any> {
  constructor(private CatalogService: CatalogService, private route: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.CatalogService.getItems();
  }
}