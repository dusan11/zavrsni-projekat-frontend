import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-stock-new',
  templateUrl: './stock-new.component.html',
  styleUrls: ['./stock-new.component.css']
})
export class StockNewComponent implements OnInit {

  data:any;

  products:any;
  newStockEntryFormSubmitted = false;

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  goBack(){
    this.router.navigate(['/lager']);
  }

  newStockEntryForm = new FormGroup({
    amount:new FormControl('', [Validators.required, Validators.min(-1000), Validators.max(1000)]),
    product:new FormControl('', [Validators.required]),
    
  });

  get product(){
    return this.newStockEntryForm.get('product');
  }
  get amount(){
    return this.newStockEntryForm.get('amount');
  }

  saveStockEntry(){
    this.newStockEntryFormSubmitted = true;
    if(this.newStockEntryForm.invalid){
      return;
    }
    this.toggleShowSpinner();
    this.dataService.newStockEntry(this.newStockEntryForm.value).subscribe(res => {
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
      this.newStockEntryFormSubmitted = true;
      this.newStockEntryForm.reset();
    });

  }

  isShownSpinner: boolean = false ; // hidden by default

  toggleShowSpinner() {
    this.isShownSpinner = ! this.isShownSpinner;
  }

  getProducts(){
    this.dataService.getProducts().subscribe(res => {
      this.products = res;
    })
  }

}
