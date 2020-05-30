import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../interfaces/product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(page: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://127.0.0.1:5000/api/v1/product/all/${page}`);
  }

  addProduct(product: Product, auth: string): Observable<any> {
    const headerDict = {
      'Authorization': auth
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post<Product>(`http://127.0.0.1:5000/api/v1/product/create`, product, requestOptions)
      .pipe(catchError(this.errorHandler));
  }

  getFormattedPrice(price: number) {
    price = Number(price)
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(price);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "server error.");
  }
}
