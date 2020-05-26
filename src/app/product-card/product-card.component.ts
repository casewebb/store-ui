import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  constructor() { }

  @Input() product: Product;
  productPrice: string;

  ngOnInit(): void {
    this.productPrice = this.getFormattedPrice(this.product.product_price)
  }

  getFormattedPrice(price: number) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    
    return formatter.format(price);
  }

  goToProductPage() {
    window.open(this.product.product_link, "_blank")
  }

}
