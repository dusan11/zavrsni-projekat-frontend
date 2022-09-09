import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';

import { Subject } from 'rxjs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:any;
  data:any;

  dataTable:any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.getAllProducts();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,

    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getAllProducts(){
    this.dataService.getProducts().subscribe(res => {
      this.products = res;
      this.dtTrigger.next(this.products);
    });
    //let data = JSON.parse(this.products);
   // this.dataTable.columns().add(this.products);
  } 

  deleteProduct(id:any){
    this.dataService.deleteProduct(id).subscribe(res=>{
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
    })
  }

  editProduct(product:any){
    this.router.navigate(['izmijeni-proizvod/'+product.id], {relativeTo:this.route});
  }

  toNewProduct() {
    this.router.navigate(['/proizvodi/novi-proizvod']);
  }

  

}
