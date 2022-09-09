import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-transactions-order',
  templateUrl: './transactions-order.component.html',
  styleUrls: ['./transactions-order.component.css']
})
export class TransactionsOrderComponent implements OnInit {

  data:any;
  orderId:any;

  constructor(private route: ActivatedRoute, private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    this.getTransactions();
  }

  getTransactions(){
    this.dataService.orderTransactions(this.orderId).subscribe(res => {
      this.data = res;
    })
  }

  toTransactions() {
    this.router.navigate(['/transakcije']);
  }

  toOrders(){
    this.router.navigate(['/narudzbe']);
  }

}
