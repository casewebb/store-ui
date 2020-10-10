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
  @Input() productPrice: string;

  buttonText: string = "Buy now!";

  ngOnInit(): void {
    this.productPrice = this.getFormattedPrice(this.product.product_price);
    this.setAffiliateLink();
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
  
  setAffiliateLink() {
    if (!(this.product && this.product.product_link) || !this.product.product_link.toLowerCase().includes('amazon')) {
      return;
    }
    var link = new URL(this.product.product_link.split("?")[0]);
    link.searchParams.set('tag', 'ITSAJOKE_GIFTS');
    let params = new URLSearchParams(link.searchParams);
    this.product.product_link = link.toString();
  }
}
