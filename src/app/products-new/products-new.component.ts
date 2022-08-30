import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.css']
})
export class ProductsNewComponent implements OnInit {

  constructor(private dataService:DataService, private formBuilder:FormBuilder, private router:Router, private toastr:ToastrService) { }

  isShownSpinner = false;

  newProductFormSubmitted = false;
  storeProductFormSubmitted = false;
  data:any;

  ngOnInit(): void {
  }

  storeProductForm = new FormGroup({
    name:new FormControl('', [Validators.required]),
    manifacturer:new FormControl('', [Validators.required]),
    certificate_number:new FormControl('', [Validators.required]),
    price:new FormControl('', [Validators.required, Validators.pattern('^\[0-9]+(\.[0-9][0-9])?')])
  });

  get nameNew(){
    return this.storeProductForm.get('name');
  }
  get manifacturerNew(){
    return this.storeProductForm.get('manifacturer');
  }
  get certificate_numberNew(){
    return this.storeProductForm.get('certificate_number');
  }
  get priceNew(){
    return this.storeProductForm.get('price');
  }

  storeProduct(){
    this.toggleShowSpinner();
    this.storeProductFormSubmitted = true;
    if(this.storeProductForm.invalid){
      return;
    }
    this.dataService.newProduct(this.storeProductForm.value).subscribe(res => {
      this.data = res;
      if(this.data.status === 201){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 4000,
          progressBar: true
        });
        this.toggleShowSpinner();
        this.storeProductForm.reset();
        setTimeout(() => {
          window.location.reload();
          this.router.navigate(['/proizvodi']);
        }, 4000);
        
        
        
        
        // window.location.reload();
      }else{
        this.toastr.error(JSON.stringify("There was an error while processing that request."), JSON.stringify(501), {
          timeOut: 4000,
          progressBar: true
        });
        this.toggleShowSpinner();
      }
    });
    this.storeProductFormSubmitted = false;
    
    

  }

  toProducts() {
    this.router.navigate(['/proizvodi']);
  }

  toggleShowSpinner() {
    this.isShownSpinner = ! this.isShownSpinner;
  }

}
