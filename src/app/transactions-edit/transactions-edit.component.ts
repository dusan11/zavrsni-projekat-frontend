import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-transactions-edit',
  templateUrl: './transactions-edit.component.html',
  styleUrls: ['./transactions-edit.component.css']
})
export class TransactionsEditComponent implements OnInit {

  transactionId:any;
  transaction = new Transaction;

  data:any;

  editTransactionFormSubmitted = false;
  companies:any;
  orders:any;

  constructor(private route: ActivatedRoute, private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getCompanies();
    this.getOrders();
    this.transactionId = this.route.snapshot.params['id'];
    this.getTransaction();
  }

  goBack(){
    this.router.navigate(['/transakcije']);
  }

  getTransaction(){
    this.dataService.getTransactionById(this.transactionId).subscribe(res => {
      this.data = res;

      this.editTransactionForm.setValue({
        date:this.data.date,
        amount:this.data.amount,
        company:this.data.company_id,
        order:this.data.order_id
      });
      this.transaction = this.data;
    })
  }

  editTransactionForm = new FormGroup({
    date:new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
    amount:new FormControl('', [Validators.required, Validators.pattern('^\[0-9]+(\.[0-9][0-9])?')]),
    company:new FormControl('', [Validators.required]),
    order:new FormControl('', [Validators.required]),
  });

  get date(){
    return this.editTransactionForm.get('date');
  }
  get amount(){
    return this.editTransactionForm.get('amount');
  }
  get company(){
    return this.editTransactionForm.get('company');
  }
  get order(){
    return this.editTransactionForm.get('order');
  }

  editTransaction(){
    this.editTransactionFormSubmitted = true;
    if(this.editTransactionForm.invalid){
      return;
    }
    console.log(this.editTransactionForm.value);
    this.toggleShowSpinner();
    this.dataService.editTransaction(this.editTransactionForm.value, this.transactionId).subscribe(res => {
      this.data=res;
      console.log(res);
      if(this.data.status === 204){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.status), {
          timeOut: 4000,
          progressBar: true
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        this.toastr.error(JSON.stringify("There was an error while processing that request."), JSON.stringify(501), {
          timeOut: 4000,
          progressBar: true
        });
      }
      this.editTransactionFormSubmitted = true;
      this.editTransactionForm.reset();
    });

  }
  isShownSpinner: boolean = false ; // hidden by default

  toggleShowSpinner() {
    this.isShownSpinner = ! this.isShownSpinner;
  }

  getCompanies(){
    this.dataService.getCompanies().subscribe(res => {
      this.companies = res;
    })
  }

  getOrders(){
    this.dataService.getOrders().subscribe(res => {
      this.orders = res;
    })
  }

}
