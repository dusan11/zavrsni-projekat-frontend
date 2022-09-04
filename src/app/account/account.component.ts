import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  data:any;

  token:any;
  userData:any;
  userEmail:any;
  userId:any;

  userInfo:any;
  userName:any;
  createdAt:any;

  nameFormSubmitted = false;
  emailFormSubmitted = false;

  constructor(private router:Router, private dataService:DataService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    this.userData = jwt_decode(this.token);
  //  console.log(this.userData);

    //this.userEmail = this.userData.email;
    this.userId = this.userData.user_id;

    this.dataService.userInfo(this.userId).subscribe(res => {
      this.userInfo = res;
      this.userName = this.userInfo.name;
      this.userEmail = this.userInfo.email;
    //  console.log(res);
    });
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


//name change form

nameChangeForm = new FormGroup({
  name:new FormControl('', [Validators.required]),
});
get name(){
  return this.nameChangeForm.get('name');
}
changeUserName(){
  this.nameFormSubmitted = true;
  if(this.nameChangeForm.invalid){
    return;
  }
  console.log(this.nameChangeForm.value);
  this.toggleShowSpinner();
  this.dataService.changeUserName(this.nameChangeForm.value, this.userId).subscribe(res => {
    this.data=res;
    console.log(res);
    if(this.data.status === 1){
      this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
        timeOut: 4000,
        progressBar: true
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } else {
      this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
        timeOut: 4000,
        progressBar: true
      });
    }
    this.nameFormSubmitted = true;
    this.nameChangeForm.reset();
  });

}

//email change form

emailChangeForm = new FormGroup({
  email:new FormControl('', [Validators.required, Validators.email]),
});
get email(){
  return this.emailChangeForm.get('email');
}
changeEmail(){
  this.emailFormSubmitted = true;
  if(this.emailChangeForm.invalid){
    return;
  }
  console.log(this.emailChangeForm.value);
  this.toggleShowSpinner();
  this.dataService.changeUserEmail(this.emailChangeForm.value, this.userId).subscribe(res => {
    this.data=res;
    console.log(res);
    if(this.data.status === 1){
      this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
        timeOut: 4000,
        progressBar: true
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } else {
      this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
        timeOut: 4000,
        progressBar: true
      });
    }
    this.emailFormSubmitted = true;
    this.emailChangeForm.reset();
  });
}



isShown: boolean = false ; // hidden by default

toggleShow() {
  this.isShown = ! this.isShown;
  if(this.isShownName=true){
    this.isShownName=false;
    
  }
}

isShownName: boolean = false ; // hidden by default

toggleShowName() {
  this.isShownName = ! this.isShownName;
  if(this.isShown=true){
    this.isShown=false;
    
  }
}

isShownSpinner: boolean = false ; // hidden by default

toggleShowSpinner() {
  this.isShownSpinner = ! this.isShownSpinner;
}

}
