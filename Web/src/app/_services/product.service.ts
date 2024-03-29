import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { api } from '../_api/apiUrl';
import { Item } from '../_models/item.model';
import { ApiResponse } from '../_models/response.model';
import { CommonService } from './common.service';


@Injectable({ providedIn: 'root' })
export class ProductService {
    products = [];
    cartItems: Item[] = [];

    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private commonService: CommonService
    ) {
        this.loadCartItems();
    }
    // Lấy danh sách sản phẩm
    get_DishList() {
        return this.http.get<ApiResponse>(api.get_dishlist)
            .pipe(catchError(err => this.commonService.handleError(err)));
    }

    // Lấy thông tin 1 sản phẩm
    get_dish(id: string) {
        return this.http.get<ApiResponse>(api.get_dish + "/" + id)
            .pipe(catchError(err => this.commonService.handleError(err)));
    }

    // Lấy danh sách sản phẩm của 1 category
    get_dish_by_category(category: string, page: number) {
        return this.http.get<ApiResponse>(api.get_category + "?categories=" + category + "&page=" + page)
            .pipe(catchError(err => this.commonService.handleError(err)));
    }

    // Lấy toàn bộ comment và rating của món ăn
    get_dishRating(dish_id: string, page: number) {
        return this.http.get<ApiResponse>(api.product_rate + "?id=" + dish_id + "&page=" + page)
            .pipe(catchError(err => this.commonService.handleError(err)));
    }

    // Chỉnh sửa comment và rating của món ăn
    edit_rating(rating_id: string, rating: number, content: string) {
        let headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token'),
        })
        let body = `id=${rating_id}&score=${rating}&comment=${content}`;
        return this.http.put<ApiResponse>(api.product_rate, body, { headers: headers })
            .pipe(catchError(err => this.commonService.handleError(err)));
    }

    // Thêm comment và rating của món ăn
    add_rating(dish_id: string, rating: number, content: string) {
        let headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token'),
        })
        let body = `id=${dish_id}&score=${rating}&comment=${content}`;
        return this.http.post<ApiResponse>(api.product_rate, body, { headers: headers })
            .pipe(catchError(err => this.commonService.handleError(err)));
    }

    //API CŨ
    // Tìm tất cả sản phẩm
    findAll(): any[] {
        this.products = JSON.parse(localStorage.getItem('dish_list'));
        return this.products;
    }

    // Tìm sản phẩm qua id
    find(id: string): any {
        this.products = JSON.parse(localStorage.getItem('dish_list'));
        return this.products[this.getSelectedIndex(id)];
    }

    // Lấy index sản phẩm qua id
    private getSelectedIndex(id: string) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i]._id == id) {
                return i;
            }
        }
        return -1;
    }

    // Thêm món vào giỏ hàng
    addCartItem(id: string, quantity: number) {
        let product = this.find(id);
        if (quantity != 0) {

            // update quantity for existing item
            var found = false;
            for (var i = 0; i < this.cartItems.length && !found; i++) {
                var item = this.cartItems[i];
                if (item.product._id === product._id) {
                    found = true;
                    item.quantity = item.quantity + quantity;
                }
            }
            // add new item
            if (!found) {
                this.cartItems.push({
                    product,
                    quantity: quantity
                });
            }
            this.saveCartItems();
            this.toastr.success("Added to cart!")
        }
        return false;
    };

    // xóa giỏ hàng
    clearCartItem(id) {
        if (id) {
            for (var i = 0; i < this.cartItems.length; i++) {
                var item = this.cartItems[i];
                if (item.product._id === id) {
                    this.cartItems.splice(i, 1);
                }
            }
        } else {
            this.cartItems = [];
        }
        this.saveCartItems();
    }

    // Thay đổi số lượng món
    changeItemQuantity(id: string, value) {
        for (var i = 0; i < this.cartItems.length; i++) {
            var item = this.cartItems[i];
            if (item.product._id === id) {
                item.quantity = value;
            }
        }
        this.saveCartItems();
    }

    // Lấy tổng số món trong giỏ hàng
    getTotalCount(id) {
        var count = 0;
        for (var i = 0; i < this.cartItems.length; i++) {
            var item = this.cartItems[i];
            if (id == null || item.product._id == id) {
                count += item.quantity;
            }
        }
        return count;
    }

    // Load giỏ hàng lúc khởi tạo
    private loadCartItems() {
        if (!!localStorage.getItem('cart'))
            this.cartItems = JSON.parse(localStorage.getItem('cart'));
    }

    // Lưu giỏ hàng
    saveCartItems() {
        if (localStorage != null && JSON != null) {
            localStorage['cart'] = JSON.stringify(this.cartItems);
        }
    };
}