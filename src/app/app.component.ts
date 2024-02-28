import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {ProductsListComponent} from "./components";
import {HeaderComponent} from "./components/header/header.component";
import {CartComponent} from "./components/cart/cart.component";
import {FooterComponent} from "./components/footer/footer.component";

const ANGULAR_MODULES = [
  RouterOutlet,
  CommonModule
]

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  ProductsListComponent,
  CartComponent
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ...ANGULAR_MODULES,
    ...COMPONENTS,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
