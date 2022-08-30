import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
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


}
