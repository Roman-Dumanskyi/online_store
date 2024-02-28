import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services";
import {map} from "rxjs";
import {IProduct} from "../../interfaces";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {DropdownModule} from "primeng/dropdown";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {CurrencyPipe} from "@angular/common";

const PRIME_NG_MODULES = [
  TableModule,
  ButtonModule
];
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [...PRIME_NG_MODULES, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  selectedProductsIds: string | null = '';
  cartItems: IProduct[] = [];

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.selectedProductsIds = localStorage.getItem('products');
    this.setProductsToCart(this.selectedProductsIds);
  }

  setProductsToCart(ids: string | null) {
    this.productService.getProductsForCart(ids)
      .subscribe(res => this.cartItems = res);
  }

  removeProduct(product: IProduct) {
    const refreshedCartIds: string[] = []
    const removedProduct = this.cartItems?.indexOf(product);
    this.cartItems?.splice(removedProduct, 1);

    this.cartItems.forEach(product => {
      refreshedCartIds.push(product.id.toString());
    });
    localStorage.setItem('products', refreshedCartIds.toString());
    this.selectedProductsIds = localStorage.getItem('products');

    this.productService.getProductsForCart(this.selectedProductsIds)
      .subscribe(res => this.cartItems = res);
  }
}
