import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/_models/item.model';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  items: Item[] = [];
  total: number = 0;

  constructor(
    public productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!!localStorage.getItem('cart')) {
      this.loadCart();
    }
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = cart[i];
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.total += item.product.price * item.quantity;
    }
  }

  remove(id: string): void {
    this.productService.clearCartItem(id);
    this.loadCart();
  }

  quantityChanged(id: string, value) {
    // alert(value.target.value);
    this.productService.changeItemQuantity(id, value.target.value);
    this.loadCart();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}