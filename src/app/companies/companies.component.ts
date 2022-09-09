import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies:any;
  data:any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router:Router, private dataService:DataService, private formBuilder:FormBuilder, private toastr:ToastrService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCompanies();
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

  getAllCompanies(){
    this.dataService.getCompanies().subscribe(res => {
      this.companies = res;
      this.dtTrigger.next(this.companies);
    })
  }

  deleteCompany(id:any){
    this.dataService.deleteCompany(id).subscribe(res=>{
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

  editCompany(company:any){
    this.router.navigate(['izmijeni-kompaniju/'+company.id], {relativeTo:this.route});
  }

  toNewCompany() {
    this.router.navigate(['/kompanije/nova-kompanija']);
  }

}
