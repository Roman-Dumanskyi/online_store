import {Component, OnInit} from '@angular/core';
import {DataViewModule} from "primeng/dataview";
import {CommonModule} from "@angular/common";
import {IProduct} from "../../interfaces";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {FilterComponent} from "../filter/filter.component";
import {ProductService} from "../../services";
import {Observable} from "rxjs";
import {DividerModule} from "primeng/divider";
import {DialogModule} from "primeng/dialog";
import {CartComponent} from "../cart/cart.component";

const ANGULAR_MODULES = [
  CommonModule,
  FormsModule
];

const PRIME_NG_MODULES = [
  DataViewModule,
  RatingModule,
  TagModule,
  ButtonModule,
  CardModule,
  DividerModule,
  DialogModule
];

const COMPONENTS = [
  FilterComponent,
  CartComponent
]

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [...ANGULAR_MODULES, ...PRIME_NG_MODULES, ...COMPONENTS],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  products: IProduct[] = [];
  selectedIds: number[] = [];

  $filter: Observable<any> = new Observable<any>();
  visible: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => this.products = res);
  }

  addToCart(product: IProduct) {
    this.selectedIds.push(product.id);
    localStorage.setItem('products', this.selectedIds.toString());
  }

  filterByCategory(category: string) {
    this.$filter = category ? this.productService.sortProductsByCategory(category) : this.productService.getProducts();

    this.$filter.subscribe(res => this.products = res);
  }
}
