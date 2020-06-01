import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss']
})
export class ProductDisplayComponent implements OnInit {

  public products: Product[];
  public totalProducts: number;
  private notScrolly: boolean = true;
  private endOfData: boolean = false;
  private nextProductPage: number = 2;
  private searchActive: boolean = false;

  searchForm: FormGroup;
  get searchControls() {
    return this.searchForm.controls;
  }

  constructor(private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loadInitialProducts();
    this.searchForm = this.fb.group({
      searchTerm: '',
      minPrice: '',
      maxPrice: ''
    });
    this.handleSearchFormChanges();
  }

  loadInitialProducts() {
    this.productService.getProducts(1).subscribe(response => {
      this.products = response['products'];
    });
  }

  onScroll() {
    if (this.notScrolly && !this.endOfData) {
      this.notScrolly = false;
      this.loadMoreProducts();
    }
  }

  loadMoreProducts() {
    let upcomingProducts;
    if (this.searchActive) {
      upcomingProducts = this.productService.getFilteredProducts(this.nextProductPage, this.searchControls.searchTerm.value,
        this.searchControls.maxPrice.value, this.searchControls.minPrice.value);
    } else {
      upcomingProducts = this.productService.getProducts(this.nextProductPage);
    }

    upcomingProducts.subscribe(response => {
      const newProducts = response['products'];

      if (newProducts.length == 0) {
        this.endOfData = true;
      }

      this.products = this.products.concat(newProducts);
      this.notScrolly = true;
      this.nextProductPage++;
    });
  }

  handleSearchFormChanges() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(() => {
        this.nextProductPage = 2;
        this.searchActive = true;
        this.productService.getFilteredProducts(1, this.searchControls.searchTerm.value,
          this.searchControls.maxPrice.value, this.searchControls.minPrice.value).subscribe(response => {
            this.products = response['products']
            if (this.products.length > 0) {
              this.endOfData = false;
            }
          });
      })
  }


}
