import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../interfaces/product'

//let url = "198.100.45.45";
let url = "127.0.0.1:5000";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts(page: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://${url}/api/v1/product/all/${page}`)
      .pipe(catchError(this.errorHandler));
  }

  getFilteredProducts(page: number, searchTerm: string, maxPrice: string, minPrice: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());

    if (searchTerm && !(searchTerm == '')) {
      params = params.append('searchTerm', searchTerm);
    }
    if (maxPrice && !(maxPrice == '')) {
      params = params.append('maxPrice', maxPrice);
    }
    if (minPrice && !(minPrice == '')) {
      params = params.append('minPrice', minPrice);
    }

    return this.http.get<any>(`http://${url}/api/v1/product/filter`, { params: params })
      .pipe(catchError(this.errorHandler));
  }

  addProduct(product: Product, auth: string): Observable<any> {
    const headerDict = {
      'Authorization': auth
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post<Product>(`http://${url}/api/v1/product/create`, product, requestOptions)
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
