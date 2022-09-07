import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker'

@Component({
  selector: 'app-orders-new',
  templateUrl: './orders-new.component.html',
  styleUrls: ['./orders-new.component.css']
})
export class OrdersNewComponent implements OnInit {

  bsConfig?: Partial<BsDatepickerConfig>;

  data:any;

  companies:any;
  products:any;
  orderTypes:any;

  newOrderFormSubmitted = false;

  orderStatuses:any;
  amount:any;
  amountParsed:any;
  priceParsed:any;

  totalPrice:number=0;
  tempProduct:any;

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) {
    
   }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { containerClass: "theme-dark-blue" });
    this.getCompanies();
    this.getOrderTypes();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  toOrders(){
    this.router.navigate(['/narudzbe']);
  }

  newOrderForm = new FormGroup({
    //date:new FormControl('', [Validators.required]),
    //date:new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
    date:new UntypedFormControl(new Date()),
    company:new FormControl('', [Validators.required]),
    orderStatus:new FormControl(1, [Validators.required]),
    totalPrice:new FormControl(0),
    orderType:new FormControl(2, [Validators.required])

  });



  get date(){
    return this.newOrderForm.get('date');    
  }
  get company(){
    return this.newOrderForm.get('company');
  }
  get orderStatus(){
    return this.newOrderForm.get('order_status');
  }
  get orderType(){
    return this.newOrderForm.get('order_type');
  }

  saveOrder(){
    this.newOrderFormSubmitted = true;
    if(this.newOrderForm.invalid){
      return;
    }
    console.log(this.newOrderForm.value);

    var formData = {"date": this.newOrderForm.value.date.toLocaleDateString("sv-SE"), 
                    "company":this.newOrderForm.value.company,
                    "orderStatus":this.newOrderForm.value.orderStatus,
                    "orderType": this.newOrderForm.value.orderType,
                    "totalPrice": this.newOrderForm.value.totalPrice}

    console.log(formData);

    this.toggleShowSpinner();
    this.dataService.newOrder(formData).subscribe(res => {
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
      this.newOrderFormSubmitted = true;
      this.newOrderForm.reset();
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

  getProducts(){
    this.dataService.getProducts().subscribe(res => {
      this.products = res;
    })
  }

  getOrderTypes(){
    this.dataService.getOrderTypes().subscribe(res => {
      this.orderTypes = res;
    })
  }

}
