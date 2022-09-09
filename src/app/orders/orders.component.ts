import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:any;
  data:any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllOrders();
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

  getAllOrders(){
    this.dataService.getOrders().subscribe(res => {
      this.orders = res;
      this.dtTrigger.next(this.orders);
    })
  }

  newOrder(){
    this.router.navigate(['nova-narudzba'], {relativeTo:this.route});
  }

  editOrder(order:any){
    this.router.navigate(['izmijeni-narudzbu/'+order.id], {relativeTo:this.route});
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    

  }

  orderTransaction(orderId:any){
    this.router.navigate(['transakcije/narudzba/'+orderId], {relativeTo:this.route})

  }

}
