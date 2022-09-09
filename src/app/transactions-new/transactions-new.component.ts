import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker'

@Component({
  selector: 'app-transactions-new',
  templateUrl: './transactions-new.component.html',
  styleUrls: ['./transactions-new.component.css']
})
export class TransactionsNewComponent implements OnInit {

  bsConfig?: Partial<BsDatepickerConfig>;

  data:any;

  companies:any;
  orders:any;

  newTransactionFormSubmitted = false;

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { containerClass: "theme-dark-blue" });
    this.getCompanies();
    this.getOrders();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  toTransactions(){
    this.router.navigate(['/transakcije']);
  }

  newTransactionForm = new FormGroup({
    date:new UntypedFormControl(new Date()),
    amount:new FormControl('', [Validators.required, Validators.pattern('^\[0-9]+(\.[0-9][0-9])?')]),
    company:new FormControl('', [Validators.required]),
    order:new FormControl('', [Validators.required]),
    
  });

  get date(){
    return this.newTransactionForm.get('date');    
  }
  get company(){
    return this.newTransactionForm.get('company');
  }
  get amount(){
    return this.newTransactionForm.get('amount');
  }
  get order(){
    return this.newTransactionForm.get('order');
  }

  saveTransaction(){
    this.newTransactionFormSubmitted = true;
    if(this.newTransactionForm.invalid){
      return;
    }

    var formData = {"date": this.newTransactionForm.value.date.toLocaleDateString("sv-SE"), 
                    "company":this.newTransactionForm.value.company,
                    "amount":this.newTransactionForm.value.amount,
                    "order": this.newTransactionForm.value.order,
                   };
    this.toggleShowSpinner();
    this.dataService.newTransaction(formData).subscribe(res => {
      this.data=res;
      console.log(res);
      if(this.data.status === 201){
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
      this.newTransactionFormSubmitted = true;
      this.newTransactionForm.reset();
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
