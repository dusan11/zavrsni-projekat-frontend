import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../models/company.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companies-edit',
  templateUrl: './companies-edit.component.html',
  styleUrls: ['./companies-edit.component.css']
})
export class CompaniesEditComponent implements OnInit {
  companyId:any;
  company = new Company;

  data:any;

  editCompanyFormSubmitted = false;
  isShownSpinner = false;

  constructor(private route: ActivatedRoute, private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.params['id'];
    this.getCompany();
  }

  getCompany(){
    this.dataService.getCompanyById(this.companyId).subscribe(res => {
      this.data = res;
      this.company = this.data;

      this.editCompanyForm.setValue({
        name:this.company.name,
        adress:this.company.adress,
        account_no:this.company.account_no,
        email:this.company.email,
        responsible_person:this.company.responsible_person
      })
    })
  }

  editCompanyForm = new FormGroup({
    name:new FormControl('', [Validators.required]),
    adress:new FormControl('', [Validators.required]),
    account_no:new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required, Validators.email]),
    responsible_person:new FormControl('', [Validators.required])
  });

  get name(){
    return this.editCompanyForm.get('name');
  }
  get adress(){
    return this.editCompanyForm.get('adress');
  }
  get account_no(){
    return this.editCompanyForm.get('account_no');
  }
  get email(){
    return this.editCompanyForm.get('email');
  }
  get responsible_person(){
    return this.editCompanyForm.get('responsible_person');
  }

  editCompany(){
    this.toggleShowSpinner();
    this.editCompanyFormSubmitted = true;
    if(this.editCompanyForm.invalid){
      return;
    }
    
    this.dataService.editCompany(this.editCompanyForm.value, this.companyId).subscribe(res=>{
      this.data=res;
      console.log(res);
      if(this.data.status === 204){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.status), {
          timeOut: 4000,
          progressBar: true
        });
        this.toggleShowSpinner();
        this.editCompanyForm.reset();
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
      this.editCompanyFormSubmitted = true;
    });
    
  }

  toCompanies() {
    this.router.navigate(['/kompanije']);
  }

  toggleShowSpinner() {
    this.isShownSpinner = ! this.isShownSpinner;
  }

}
