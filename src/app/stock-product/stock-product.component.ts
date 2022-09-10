import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-stock-product',
  templateUrl: './stock-product.component.html',
  styleUrls: ['./stock-product.component.css']
})
export class StockProductComponent implements OnInit {

  products:any;
  data:any;

  productId:any;

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.dataService.getProducts().subscribe(res => {
      this.products = res;
    })
  }

  productsStockLevelForm = new FormGroup({
    productId:new FormControl(),
  })

  get productIdSL(){
    return this.productsStockLevelForm.get('productId');
  }

  getStockLevel(){
    this.dataService.getProductStockById(this.productsStockLevelForm.value.productId).subscribe(res => {
      this.data = res;
    })
  }

}
