import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CardModule,
    DropdownModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
