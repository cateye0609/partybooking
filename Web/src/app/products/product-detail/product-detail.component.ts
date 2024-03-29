import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product.model';
import { Rating } from 'src/app/_models/rating.model';
import { ProductService } from 'src/app/_services/product.service';

interface Dish_rating {
  start: number;
  end: number;
  total_page: number;
  count_rate: number;
  avg_rate: number;
  list_rate: Rating[];
}
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product_data: Product; // Thông tin về món ăn được gọi
  product_ratings: Dish_rating;
  suggest_list = [];     // Danh sách các món tương tự

  products_list = []; // Tạm thời
  item_quantity = 1;

  show = true;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.products_list = JSON.parse(localStorage.getItem('dish_list')); // Tạm thời
    this.activatedRoute.data.subscribe(data => {
      this.product_data = data['product'];
      this.get_suggestList(this.product_data.categories[0]);
      if (this.product_data.description.length > 250) {
        this.show = false;
      };
      this.get_dishRating(this.product_data._id);
    })
  }
  // Lấy thông tin rating của món ăn
  get_dishRating(dish_id: string) {
    this.productService.get_dishRating(dish_id, 1).subscribe(
      res => {
        this.product_ratings = res.data as Dish_rating;
      },)
  }
  // Lấy danh sách sản phẩm tương tự
  get_suggestList(category: string) {
    this.productService.get_dish_by_category(category, 1).subscribe(
      res => {
        this.suggest_list = res.data.value as Product[];
      })
  }

  // Tạm thời
  product_filter(filter: string) {
    for (var i = 0; i < this.products_list.length; i++) {
      if (this.products_list[i].categories == filter && this.products_list[i]._id != this.product_data._id) {
        this.suggest_list.push(this.products_list[i]);
      }
    }
  }

  // Thay đổi số lượng sản phẩm
  quantityChanged(event: any) {
    this.item_quantity = event.target.value;
  }
  // Thêm sản phẩm vào giỏ hàng
  addToCart() {
    this.productService.addCartItem(this.product_data._id, this.item_quantity);
  }
  // Lăn đến element
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
