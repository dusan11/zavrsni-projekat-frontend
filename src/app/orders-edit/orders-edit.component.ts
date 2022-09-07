
import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.css']
})
export class OrdersEditComponent implements OnInit {

  orderId:any;
  order = new Order;



  data:any;

  editOrderFormSubmitted = false;
  companies:any;
  products:any;

  orderStatuses:any;
  orderTypes:any;

  editDate:any;
  editTotalPrice:any;
  editCompanyId:any;
  editCompanyName:any;
  editOrderStatusId:any;
  editOrderStatusStatus:any;
  editOrderTypeId:any;
  editOrderTypeType:any;

  amount:any;
  orderProducts:any;

  newTotalPrice:any;

  constructor(private route: ActivatedRoute, private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getCompanies();
    this.getProducts();
    this.getOrderStatuses();
    this.getOrderTypes();
    this.orderId = this.route.snapshot.params['id'];
    this.getOrder();  
  }

  showOrder(order:any){
    console.log(order);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  goBack(){
    this.router.navigate(['/narudzbe']);
  }

  getOrder(){
    this.dataService.getOrderById(this.orderId).subscribe(res => {
      this.data = res;
      this.editDate = this.data.date;
      this.editTotalPrice = this.data.total_price;
      this.editCompanyId = this.data.company_id;
      this.editCompanyName = this.data.company.name;
      this.editOrderStatusId = this.data.order_status_id;
      this.editOrderStatusStatus = this.data.order_status.status;
      this.editOrderTypeId = this.data.order_type_id;
      this.editOrderTypeType = this.data.order_type.type;

      this.order = this.data;
      this.orderProducts = this.data.products;

      this.editOrderForm.setValue({
        date:this.editDate,
        companyId:this.editCompanyId,
        orderStatusId:this.editOrderStatusId,
        total_price:this.editTotalPrice,
        orderTypeId:this.editOrderTypeId
      })
      
    })
  }

  commingSoon(){
    alert("Comming soon.");
  }

  showOrderInConsole(){
    console.log(this.order);
    console.log(this.orderProducts);
  }

  editOrderForm = new FormGroup({
    date:new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
    companyId:new FormControl('', [Validators.required]),
    orderStatusId:new FormControl('', [Validators.required]),
    total_price:new FormControl(''),
    orderTypeId:new FormControl('', [Validators.required])
  });

  get date(){
    return this.editOrderForm.get('date');
  }
  get companyId(){
    return this.editOrderForm.get('company_id');
  }
  get orderStatusId(){
    return this.editOrderForm.get('order_status_id');
  }
  get orderTypeId(){
    return this.editOrderForm.get('order_type_id');
  }
  get total_price(){
    return this.editOrderForm.get('total_price');
  }

  
  editOrder(){
    this.editOrderFormSubmitted = true;
    if(this.editOrderForm.invalid){
      return;
    }
    console.log(this.editOrderForm.value);
    this.toggleShowSpinner();
    this.dataService.editOrder(this.editOrderForm.value, this.orderId).subscribe(res => {
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
      this.editOrderFormSubmitted = true;
      this.editOrderForm.reset();
    });
  }

  increaseTotalPrice(amount:any, productId:any, productPrice:any, order:any){
    const parsedAmount = parseInt(amount);
    const parsedProductPrice = parseFloat(productPrice);
    const parsedTotalPrice = parseFloat(this.editTotalPrice);
    this.newTotalPrice = {
      "total_price" : parsedTotalPrice + parsedAmount*parsedProductPrice
    };
    console.log(parsedTotalPrice);
    this.dataService.editOrderPrice(this.newTotalPrice, this.orderId).subscribe(res => {
      this.data = res;
      if(this.data.status === 204){
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }else{
        this.toastr.error(JSON.stringify("There was an error while processing that request."), JSON.stringify(501), {
          timeOut: 4000,
          progressBar: true
        });
      }
    })
  }

  addProductToOrder(product:any){
    this.amount = {
      "amount" : prompt("Please enter amount for the product")
    };
    console.log(this.amount);
    if(!isNaN(this.amount.amount) && this.amount.amount>0){
      this.dataService.addProductToOrder(this.amount, this.orderId, product.id).subscribe(res => {
        console.log(res);
        this.data = res;
        if(this.data.status === 200){
          this.increaseTotalPrice(this.amount.amount, product.id, product.price, this.order);
          this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.status), {
            timeOut: 4000,
            progressBar: true
          });
        } else {
          this.toastr.error(JSON.stringify("There was an error while processing that request."), JSON.stringify(501), {
            timeOut: 4000,
            progressBar: true
          });
        }
      })
    }else{
      this.toastr.error(JSON.stringify("You have to enter the whole non-negative number"), JSON.stringify("Wrong format!"), {
        timeOut: 3000,
      });
    }
  }

  decreaseTotalPrice(order:any, productId:any, arrayIndex:any){
    const parsedAmount = parseInt(order.products[arrayIndex].pivot.amount);
    const parsedProductPrice = parseFloat(order.products[arrayIndex].price);
    const parsedTotalPrice = parseFloat(this.editTotalPrice);
    this.newTotalPrice = {
      "total_price" : parsedTotalPrice - parsedAmount*parsedProductPrice
    };
    console.log(parsedAmount);
    console.log(parsedProductPrice);
    console.log(this.newTotalPrice);

     this.dataService.editOrderPrice(this.newTotalPrice, this.orderId).subscribe(res => {
      this.data = res;
      if(this.data.status === 204){
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }else{
        this.toastr.error(JSON.stringify("Internal server error. Couldn't update the total price"), JSON.stringify(500), {
          timeOut: 4000,
          progressBar: true
        });
      }
    }) 

  }

  removeProductFromOrder(product:any, arrayIndex:any){
    this.dataService.removeProductFromOrder(this.orderId, product.id).subscribe(res => {
      console.log(res);
      this.data = res;
      if(this.data.status === 200){
        this.decreaseTotalPrice(this.order, product.id, arrayIndex);
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.status), {
          timeOut: 4000,
          progressBar: true
        });
         /* setTimeout(() => {
          window.location.reload();
        }, 2000);  */
      } else {
        this.toastr.error(JSON.stringify("Internal server error. Couldn't remove the product."), JSON.stringify(500), {
          timeOut: 4000,
          progressBar: true
        });
      }
      
    });
    //products.pivot.amount
    
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

  getOrderStatuses(){
    this.dataService.getOrderStatuses().subscribe(res => {
      this.orderStatuses = res;
      
    })
  }

  getOrderTypes(){
    this.dataService.getOrderTypes().subscribe(res => {
      this.orderTypes = res;
      
    })
  }

}
