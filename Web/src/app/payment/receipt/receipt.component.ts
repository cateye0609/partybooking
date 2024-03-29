import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceiptItem } from 'src/app/_models/item.model';
import { Receipt } from 'src/app/_models/receipt.model';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  receipt: Receipt;
  receipt_items: ReceiptItem[] = [];

  bill_id: string;
  checkout_session_id: string;

  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.receipt = JSON.parse(sessionStorage.getItem('current_receipt'));
    this.receipt_items = this.receipt.dishes;
    this.activatedRoute.params.subscribe(params => {
      this.bill_id = params['bill_id'];
    })
    this.get_paymentInfo(this.bill_id);
  }

  pay() {
    this.paymentService.pay(this.checkout_session_id);
  }

  get_paymentInfo(bill_id: string) {
    this.paymentService.get_paymentInfo(bill_id).subscribe(
      res => {
        this.checkout_session_id = res.data.id;
      })
  }
}