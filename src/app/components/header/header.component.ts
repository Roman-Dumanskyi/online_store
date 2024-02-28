import {Component} from '@angular/core';
import {PanelModule} from "primeng/panel";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";

const PRIME_NG_MODULES = [
  PanelModule,
  ButtonModule
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [...PRIME_NG_MODULES, MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuItems = [
    {label: 'Products', routerLink: '/'},
    {label: 'Cart', routerLink: '/cart'}
  ];
}
