import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import 'charts.css';
import { DataService } from '../service/data.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data:any;



  constructor(private router:Router, private route:ActivatedRoute, private dataService:DataService) {
    
   }

   getChartData(){
    this.dataService.getProductStock().subscribe(res => {
      this.data = res;
      console.log(this.data)


      
    });

   }




  ngOnInit(): void {
    this.getChartData();

    
    
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  newOrder(){
    this.router.navigate(['/narudzbe/nova-narudzba']);
  }
  newProduct(){
    this.router.navigate(['/proizvodi/novi-proizvod']);
  }
  newCompany(){
    this.router.navigate(['/kompanije/nova-kompanija']);
  }
  newTransaction(){
    this.router.navigate(['/transakcije/nova-transakcija']);
  }
  newStock(){
    this.router.navigate(['/lager/novi-unos']);
  }


}
