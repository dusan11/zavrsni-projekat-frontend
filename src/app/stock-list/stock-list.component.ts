import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stocks:any;
  data:any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllStockEntries();
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

  getAllStockEntries(){
    this.dataService.getStockEntries().subscribe(res => {
      this.stocks = res;
      this.dtTrigger.next(this.stocks);
    })
  }

  editStockEntry(stock:any){
    this.router.navigate(['/lager/izmijeni-unos/'+stock.id]);
  }

}
