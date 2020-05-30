import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';

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

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadInitialProducts();
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
    this.productService.getProducts(this.nextProductPage).subscribe(response => {
      const newProducts = response['products'];

      if (newProducts.length == 0) {
        this.endOfData = true;
      }

      this.products = this.products.concat(newProducts);
      this.notScrolly = true;
      this.nextProductPage++;
    });

  }


}
