import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-finantial-card',
  templateUrl: './finantial-card.component.html',
  styleUrls: ['./finantial-card.component.css']
})
export class FinantialCardComponent implements OnInit {

  companies:any;
  data:any;

  companyId:any;

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(){
    this.dataService.getCompanies().subscribe(res => {
      this.companies = res;
    })
  }

  finantialCardForm = new FormGroup({
    companyId:new FormControl(),
  })

  get companyIdFC(){
    return this.finantialCardForm.get('companyId');
  }

  getFinantialCard(){
    this.dataService.finantialCard(this.finantialCardForm.value.companyId).subscribe(res => {
      this.data = res;
    })
  }

}
