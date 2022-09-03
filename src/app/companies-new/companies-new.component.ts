import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companies-new',
  templateUrl: './companies-new.component.html',
  styleUrls: ['./companies-new.component.css']
})
export class CompaniesNewComponent implements OnInit {

  isShownSpinner = false;

  storeCompanyFormSubmitted = false;
  data:any;

  constructor(private dataService:DataService, private formBuilder:FormBuilder, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
  } 

  storeCompanyForm = new FormGroup({
    name:new FormControl('', [Validators.required]),
    adress:new FormControl('', [Validators.required]),
    account_no:new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required, Validators.email]),
    responsible_person:new FormControl('', [Validators.required])
  });
  
  get nameNew(){
    return this.storeCompanyForm.get('name');
  }
  get adressNew(){
    return this.storeCompanyForm.get('adress');
  }
  get account_noNew(){
    return this.storeCompanyForm.get('account_no');
  }
  get emailNew(){
    return this.storeCompanyForm.get('email');
  }
  get responsible_personNew(){
    return this.storeCompanyForm.get('responsible_person');
  }

  storeCompany(){
    this.toggleShowSpinner();
    this.storeCompanyFormSubmitted = true;
    if(this.storeCompanyForm.invalid){
      return;
    }    
    this.dataService.newCompany(this.storeCompanyForm.value).subscribe(res => {
      this.data=res;
      if(this.data.status === 201){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.status), {
          timeOut: 4000,
          progressBar: true
        });
        this.toggleShowSpinner();
        this.storeCompanyForm.reset();
        setTimeout(() => {
          window.location.reload();
          this.router.navigate(['/kompanije']);
        }, 4000);
      } else {
        this.toastr.error(JSON.stringify("There was an error while processing that request."), JSON.stringify(501), {
          timeOut: 4000,
          progressBar: true
        });
        this.toggleShowSpinner();
      }
      this.storeCompanyFormSubmitted = true;
      
    });
  }

  toCompanies() {
    this.router.navigate(['/kompanije']);
  }

  toggleShowSpinner() {
    this.isShownSpinner = ! this.isShownSpinner;
  }

}
