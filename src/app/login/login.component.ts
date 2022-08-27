import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from '../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  data:any;
  token:any;

  constructor(private dataService: DataService, private toastr: ToastrService, private router:Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  loginUser(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.toggleShowSpinner();
    this.dataService.login(this.loginForm.value).subscribe(res => {
      this.data = res;
     // console.log(res);
     if(this.data.status === 1) {
      this.token = this.data.data.token;
      sessionStorage.setItem('token', this.token);
 //     localStorage.setItem('token', this.token);
      this.router.navigate(['/']);
      this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
        timeOut: 4000,
        progressBar: true
      });
     } else if(this.data.status === 0) {
      this.submitted = false;
      this.toggleShowSpinner();
      this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
        timeOut: 4000,
        progressBar: true
      });
      
     }
    });
  }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }


isShownSpinner: boolean = false ; // hidden by default

toggleShowSpinner() {
  this.isShownSpinner = ! this.isShownSpinner;
}
}
