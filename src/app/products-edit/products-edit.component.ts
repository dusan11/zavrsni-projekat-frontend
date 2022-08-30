import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {

  productId:any;
  product = new Product;

  data:any;

  editProductFormSubmitted = false;
  isShownSpinner = false;

  constructor(private route: ActivatedRoute, private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.getProduct();
  }

  getProduct(){
    this.dataService.getProductsById(this.productId).subscribe(res => {
      this.data = res;
      this.product = this.data;

      this.editProductForm.setValue({
        name:this.product.name,
        manifacturer:this.product.manifacturer,
        certificate_number:this.product.certificate_number,
        price:this.product.price
      })
    })
  }

  editProductForm = new FormGroup({
    name:new FormControl('', [Validators.required]),
    manifacturer:new FormControl('', [Validators.required]),
    certificate_number:new FormControl('', [Validators.required]),
    price:new FormControl(0, [Validators.required, Validators.pattern('^\[0-9]+(\.[0-9][0-9])?')])
  });

  get name(){
    return this.editProductForm.get('name');
  }
  get manifacturer(){
    return this.editProductForm.get('manifacturer');
  }
  get certificate_number(){
    return this.editProductForm.get('certificate_number');
  }
  get price(){
    return this.editProductForm.get('price');
  }

  editProduct(){
    this.toggleShowSpinner();
    this.editProductFormSubmitted = true;
    if(this.editProductForm.invalid){
      return;
    }
    this.dataService.editProduct(this.editProductForm.value, this.productId).subscribe(res=>{
      this.data=res;
      console.log(res);
      if(this.data.status === 204){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 4000,
          progressBar: true
        });
        this.toggleShowSpinner();
        this.editProductForm.reset();
        setTimeout(() => {
          window.location.reload();
          this.router.navigate(['/proizvodi']);
        }, 4000);

        
        
      } else {
        this.toastr.error(JSON.stringify("There was an error while processing that request."), JSON.stringify(501), {
          timeOut: 4000,
          progressBar: true
        });
        this.toggleShowSpinner();
      }
      this.editProductFormSubmitted = false;
      
    });
    
  }

  toProducts() {
    this.router.navigate(['/proizvodi']);
  }

  toggleShowSpinner() {
    this.isShownSpinner = ! this.isShownSpinner;
  }

}
