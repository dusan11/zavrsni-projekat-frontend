import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {

  transactions:any;
  data:any;

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getAllTransactions(){
    this.dataService.getTransactions().subscribe(res => {
      this.transactions = res;
    })
  }

  editTransaction(transaction:any){
    this.router.navigate(['/transakcije/izmijeni-transakciju/'+transaction.id]);
  }

}
