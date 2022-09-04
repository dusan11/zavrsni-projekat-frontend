import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-order-type',
  templateUrl: './order-type.component.html',
  styleUrls: ['./order-type.component.css']
})
export class OrderTypeComponent implements OnInit {

  orderType:any;
  editOrderTypeFormSubmitted = false;
  newOrderTypeFormSubmitted = false;
  data:any;
  editType:any;
  orderTypeID:any;

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllOrderTypes();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getAllOrderTypes(){
    this.dataService.getOrderTypes().subscribe(res => {
      this.orderType = res;
    })
  }

  editOrderTypeSetData(id:any){
    this.dataService.getOrderTypeById(id).subscribe(res=>{
      this.data=res;
      this.editType = this.data.type;
      this.orderTypeID=id;
    })
  }

  editOrderTypeForm = new FormGroup({
    type:new FormControl('', [Validators.required])
  });
  get type(){
    return this.editOrderTypeForm.get('type');
  }

  
  editOrderType(){
    this.toggleShowSpinner();
    this.editOrderTypeFormSubmitted = true;
    if(this.editOrderTypeForm.invalid){
      return;
    }
    
    this.dataService.editOrderType(this.editOrderTypeForm.value, this.orderTypeID).subscribe(res=>{
      this.data=res;
      if(this.data.status === 204){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.status), {
          timeOut: 4000,
          progressBar: true
        });
        this.toggleShowSpinner();
        this.editOrderTypeForm.reset();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        this.toastr.error(JSON.stringify("There was an error while processing that request."), JSON.stringify(501), {
          timeOut: 4000,
          progressBar: true
        });
      }
      this.editOrderTypeFormSubmitted = false;
      
    });
  }

  newOrderTypeForm = new FormGroup({
    type:new FormControl('', [Validators.required])
  });
  get typeNew(){
    return this.newOrderTypeForm.get('type');
  }

  saveNewOrderType(){
    this.toggleShowSpinner();
    this.newOrderTypeFormSubmitted = true; 
    if(this.newOrderTypeForm.invalid){
      return;
    }
    
    this.dataService.newOrderType(this.newOrderTypeForm.value).subscribe(res => {
      this.data=res;
      if(this.data.status === 201){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.status), {
          timeOut: 4000,
          progressBar: true
        });
        this.toggleShowSpinner();
        this.newOrderTypeForm.reset();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        this.toastr.error(JSON.stringify("There was an error while processing that request."), JSON.stringify(501), {
          timeOut: 4000,
          progressBar: true
        });
      }
      this.newOrderTypeFormSubmitted = false;
    });
  }

  isShownSpinner: boolean = false ; // hidden by default

  toggleShowSpinner() {
    this.isShownSpinner = ! this.isShownSpinner;
  }

}
