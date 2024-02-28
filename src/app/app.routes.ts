import { Routes } from '@angular/router';
import {ProductsListComponent} from "./components";
import {CartComponent} from "./components/cart/cart.component";

export const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: '**',
    component: ProductsListComponent
  }
];
