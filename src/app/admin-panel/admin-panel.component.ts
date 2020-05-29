import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  form: FormGroup;
  product: Product;
  previewReady: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.product = new Product;
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      productTitle: 'Default',
      productDescription: 'Default',
      productPrice: '9.99',
      productLink: 'www.google.com',
      imageUrl: 'https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg'

    })
  }

  submit() {
    this.product.product_title = this.form.controls.productTitle.value;
    this.product.product_description = this.form.controls.productDescription.value;
    this.product.product_price = this.form.controls.productPrice.value;
    this.product.product_link = this.form.controls.productLink.value;
    this.product.product_image_url = this.form.controls.imageUrl.value;
    console.log('Submitted')
    this.previewReady = true;
    console.log('Preview ' + this.previewReady)
  }

}
