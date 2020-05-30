import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  form: FormGroup;
  product: Product;
  previewReady: boolean = false;
  hasBeenPreviewed: boolean = false;
  authKey: string;

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
    this.product = new Product;
    this.product.product_price = 0.00;
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      productTitle: '',
      productDescription: '',
      productPrice: '',
      productLink: '',
      imageUrl: '',
      imageAlt: '',
      productCategories: ''
    })
  }

  preview() {
    this.product.product_title = this.form.controls.productTitle.value;
    this.product.product_description = this.form.controls.productDescription.value;
    this.product.product_price = this.form.controls.productPrice.value;
    this.product.product_link = this.form.controls.productLink.value;
    this.product.product_image_url = this.form.controls.imageUrl.value;
    this.product.product_image_alt = this.form.controls.imageAlt.value;
    this.product.product_categories = this.parseCategories(this.form.controls.productCategories.value)
    this.previewReady = true;
  }

  updatePrice() {
      return this.productService.getFormattedPrice(this.product.product_price)
  }

  submit() {
    console.log('Sending Request: ' + JSON.stringify(this.product))
    this.productService.addProduct(this.product, this.authKey).subscribe(
      response => {
        //TODO Success / Failed Toast message
        console.log("Recieved Response: " + JSON.stringify(response));
        this.form.reset()
        this.product = new Product;
        this.product.product_price = 0.00;
        this.clearPreview();
      }
    )
  }

  clearPreview() {
    this.previewReady = false;
  }

  parseCategories(categories: string) {
    var parsedCategories = [];
    parsedCategories = categories.split(',').map(c2 => c2.trim())
    return parsedCategories;
  }

}
