import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { Stock } from '../models/stock.model';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {

  stockEntryId:any;
  stock = new Stock;

  data:any;
  products:any;

  editStockEntryFormSubmitted = false;

  constructor(private route: ActivatedRoute, private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getProducts();
    this.stockEntryId = this.route.snapshot.params['id'];
    this.getStock();
  }

  goBack(){
    this.router.navigate(['/lager']);
  }

  getStock(){
    this.dataService.getStockEntry(this.stockEntryId).subscribe(res => {
      this.data = res;

      this.editStockEntryForm.setValue({
        amount:this.data.amount,
        product:this.data.product_id,
      });
      this.stock = this.data;
      console.log(this.stock);
    })
  }

  editStockEntryForm = new FormGroup({
    amount:new FormControl('', [Validators.required, Validators.min(-1000), Validators.max(1000)]),
    product:new FormControl('', [Validators.required]),
    
  });

  get product(){
    return this.editStockEntryForm.get('product');
  }
  get amount(){
    return this.editStockEntryForm.get('amount');
  }

  editStockEntry(){
    this.editStockEntryFormSubmitted = true;
    if(this.editStockEntryForm.invalid){
      return;
    }
    console.log(this.editStockEntryForm.value);
    this.toggleShowSpinner();
    this.dataService.editStockEntry(this.editStockEntryForm.value, this.stockEntryId).subscribe(res => {
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
      this.editStockEntryFormSubmitted = true;
      this.editStockEntryForm.reset();
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
