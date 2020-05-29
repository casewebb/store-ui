import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../interfaces/product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://127.0.0.1:5000/api/v1/product/all');
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<Product>('http://127.0.0.1:5000/api/v1/product/create', product);
  }

  getFormattedPrice(price: number) {
    price = Number(price)
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(price);
  }
}
