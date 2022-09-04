import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  orderStatus:any;
  editOrderStatusFormSubmitted = false;
  newOrderStatusFormSubmitted = false;
  data:any;
  editStatus:any;
  orderStatusID:any;

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllOrderStatuses();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getAllOrderStatuses(){
    this.dataService.getOrderStatuses().subscribe(res => {
      this.orderStatus = res;
    })
  }

  editOrderStatusSetData(id:any){
    this.dataService.getOrderStatusById(id).subscribe(res=>{
      this.data=res;
      this.editStatus = this.data.status;
      this.orderStatusID=id;
    })
  }

  editOrderStatusForm = new FormGroup({
    status:new FormControl('', [Validators.required])
  });
  get status(){
    return this.editOrderStatusForm.get('status');
  }

  editOrderStatus(){
    this.toggleShowSpinner();
    this.editOrderStatusFormSubmitted = true;
    if(this.editOrderStatusForm.invalid){
      return;
    }
    this.dataService.editOrderStatus(this.editOrderStatusForm.value, this.orderStatusID).subscribe(res=>{
      this.data=res;
      if(this.data.status === 204){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.status), {
          timeOut: 4000,
          progressBar: true
        });
        this.toggleShowSpinner();
        this.editOrderStatusForm.reset();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        this.toastr.error(JSON.stringify("There was an error while processing that request."), JSON.stringify(501), {
          timeOut: 4000,
          progressBar: true
        });
      }
      this.editOrderStatusFormSubmitted = false;
      
    });
  }

  newOrderStatusForm = new FormGroup({
    status:new FormControl('', [Validators.required])
  });
  get statusNew(){
    return this.newOrderStatusForm.get('status');
  }

  saveNewOrderStatus(){
    this.toggleShowSpinner();
    this.newOrderStatusFormSubmitted = true; 
    if(this.newOrderStatusForm.invalid){
      return;
    }
    this.dataService.newOrderStatus(this.newOrderStatusForm.value).subscribe(res => {
      this.data=res;
      if(this.data.status === 201){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.status), {
          timeOut: 4000,
          progressBar: true
        });
        this.toggleShowSpinner();
        this.newOrderStatusForm.reset();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        this.toastr.error(JSON.stringify("There was an error while processing that request."), JSON.stringify(501), {
          timeOut: 4000,
          progressBar: true
        });
      }
      this.newOrderStatusFormSubmitted = false;
      
    });
  }

  isShownSpinner: boolean = false ; // hidden by default

  toggleShowSpinner() {
    this.isShownSpinner = ! this.isShownSpinner;
  }

}
