import { Component, OnInit, Input } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { api } from '../../../_api/apiUrl';
//Models
import { Product } from '../../../_models/product.model';
//Services
import { AuthenticationService } from '../../../_services/authentication.service';
import { ProductService } from '../../../_services/product.service';

declare var toastr;
declare var $: any;

interface rateOverall {
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
}
@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.css']
})
export class ProductRatingComponent implements OnInit {

  @Input() productId: string;

  currentProduct: Product;
  currentProduct_Rating: any;
  reviewOverall: rateOverall = {
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0
  }
  rate = 0;
  constructor(
    private http: HttpClient,
    private productService: ProductService,
    public authenticationService: AuthenticationService,
  ) { }
  ngOnInit() {
    this.currentProduct = this.productService.find(this.productId);
    this.currentProduct_Rating = this.currentProduct.rate;
    // console.log(this.currentProduct_Rating);
    for (var index = 0; index < this.currentProduct_Rating.lishRate.length; index++) {
      switch (this.currentProduct_Rating.lishRate[index].scorerate) {
        case 1:
          this.reviewOverall.one++;
          break;
        case 2:
          this.reviewOverall.two++;
          break;
        case 3:
          this.reviewOverall.three++;
          break;
        case 4:
          this.reviewOverall.four++;
          break;
        case 5:
          this.reviewOverall.five++;
          break;
        default:
          index++;
          break;
      }
    }
    if (!this.authenticationService.loggedIn()) {
      $('#reviewbtn').text('Login to write review');
    }
  }
  ratingSubmit(data: {
    comment: string,
    rating: number
  }) {
    if (this.authenticationService.loggedIn()) {
      let headers = new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
      let body = `_id=${this.productId}&scorerate=${data.rating}&content=${data.comment}`;
      this.http.post(api.rateDish, body, { headers: headers, observe: 'response' }).subscribe(
        res_data => {
          this.productService.getDishList();
          sessionStorage.setItem('response_body', JSON.stringify(res_data.body));
          toastr.success("Posted comment successfully!");
          window.location.reload();
        },
        err => {
          toastr.error("Error: " + err.status + " " + err.error.message);
          sessionStorage.setItem('error', JSON.stringify(err));
        }
      )
    }
    else {
      toastr.warning("You must be logged in to post a comment!");
    }
  }
}
