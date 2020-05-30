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
  affTag:string;

  ngOnInit(): void {
    this.productPrice = this.getFormattedPrice(this.product.product_price)
    this.getRandomBuyButtonText()
    this.affTag = this.getAffiliateLink()
  }

  getFormattedPrice(price: number) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(price);
  }

  goToProductPage() {
    window.open(this.product.product_link + this.affTag, "_blank")
  }

  getRandomBuyButtonText() {
    let buttonTexts = ['Quick Scope it', 'Throw a Pokeball at it', 'Buy it', 'Use your ultimate on it', 'Rage at it',
      'Sing the He Man Song', 'Ask it to be your Runescape GF', 'Hey! Listen!', 'Falcon Punch it', 'Heal it',
      'Take it out for dinner', 'Add it to your Steam Library and never play it', 'Camp in a corner with it', 'Save it from a castle',
      'Shoot it with a lazer', 'Add it to your friends list and then never talk to it', 'Let it get in the pool, then remove the ladder',
      'Cook it some pizza rolls', 'Invite it to your guild', 'Tell it how you really feel, in ALL chat', 'Sneak Baron', 'Defeat the Elite Four']
    this.buttonText = buttonTexts[Math.floor(Math.random() * buttonTexts.length)];
  }

  getAffiliateLink() {
    if (!(this.product && this.product.product_link)) {
      return '';
    }
    if (this.product.product_link.includes('?')) {
      return '&tag=WHATTHEGifts';
    } else {
      return '?tag=WHATTHEGifts';
    }
  }

}
