import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IProduct} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url);
  }

  getProductsForCart(selectedProductsIds: string | null): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url)
      .pipe(
        map(products => {
          const items: IProduct[] = []
          selectedProductsIds?.split(',').forEach(id => {
            products.filter(pr => {
              if(pr.id === +id) {
                items.push(pr);
              }
            });
          });
          return items;
        })
      );
  }

  getProductCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/categories`)
  }

  sortProductsByCategory(category: string): Observable<IProduct[]> {
    const url = `${this.url}/category/${category.toLowerCase()}`;

    return this.http.get<IProduct[]>(url);
  }

  sortProductsByDesc(order: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}?sort=${order}`);
  }
}
