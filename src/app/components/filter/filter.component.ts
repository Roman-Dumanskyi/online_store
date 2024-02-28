import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {DropdownModule} from "primeng/dropdown";
import {ProductService} from "../../services";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {map} from "rxjs";
import {ICategory} from "../../interfaces";
import {CardModule} from "primeng/card";

const ANGULAR_MODULES = [
  CommonModule,
  FormsModule
];

const PRIME_NG_MODULES = [
  InputGroupModule,
  InputGroupAddonModule,
  DropdownModule,
  CardModule
];

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [...ANGULAR_MODULES, ...PRIME_NG_MODULES],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  categories!: ICategory[];
  selectedCategory!: ICategory;

  @Output() category: EventEmitter<string> = new EventEmitter<string>();

  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getProductCategories()
      .pipe(
        map(products => {
          return products.map((product, index): ICategory => {
            return {id: index, name: product.toUpperCase()}
          })
        })
      )
      .subscribe(res => this.categories = res);
  }

  selectCategory() {
    this.category.emit(this.selectedCategory?.name);
  }
}
