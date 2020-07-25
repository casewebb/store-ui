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

  buttonText: string;

  ngOnInit(): void {
    this.productPrice = this.getFormattedPrice(this.product.product_price);
    this.getRandomBuyButtonText();
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

  getRandomBuyButtonText() {
    let buttonTexts = ['Walk in on mom in the shower, and stick around..', 'Shower with your dad, in your 20\'s',
      'Play chicken with your sister', 'Be the best big brother..', 'Become a SIMP', 'Break both your arms']
    this.buttonText = "Buy now!"
      //this.buttonText = buttonTexts[Math.floor(Math.random() * buttonTexts.length)];
  }

  setAffiliateLink() {
    if (!(this.product && this.product.product_link) || !this.product.product_link.toLowerCase().includes('amazon')) {
      return;
    }
    var link = new URL(this.product.product_link);
    link.searchParams.set('tag', 'ITSAJOKE_GIFTS');
    this.product.product_link = link.toString();
  }
}
