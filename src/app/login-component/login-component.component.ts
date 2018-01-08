import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LoginModel } from './login.model.component';
import { RegisterModel} from './login.model.component';
import { LoginService } from './login.service';
import { Observable }  from 'rxjs/Rx';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
  providers:[LoginService]
})
export class LoginComponentComponent implements OnInit {
  complexForm: FormGroup;
  forgotForm:FormGroup;
  loginModel: LoginModel = new LoginModel ();
  loginData:any
  registerModel: RegisterModel = new RegisterModel();
  register="true";
  loginDiv:boolean=true;
  forgotPasswordDiv:boolean=false;
  constructor(private toastr:ToastsManager, vRef: ViewContainerRef,private loginService:LoginService, private router:Router,private formBuilder: FormBuilder,private snackBar:MatSnackBar) { 
    this.toastr.setRootViewContainerRef(vRef);
     this.complexForm = formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])],
    })
     this.forgotForm=formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")])]

     })
  }

  ngOnInit() {
  }

  onLogIn(){
     this.loginService.Login(this.loginModel)
     .subscribe(data=>{
       this.complexForm.reset();
       this.complexForm.controls['email'].setErrors(null);
       this.complexForm.controls['password'].setErrors(null);
       this.loginData=data;
       if(data.success==false){
         this.toastr.error('Login Unsuccessful wrong credentials', 'Oops!');
       }else if (data.success==true) {
          localStorage.setItem('adminLogin', 'true');
          localStorage['email']=data.adminData.email;
          localStorage['password']=data.adminData.password;
          this.router.navigate(['/dashboard'],{ skipLocationChange: true });
       }
       console.log(JSON.stringify(data))
     })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  onForgotPassword(){
    this.forgotPasswordDiv=true;
    this.loginDiv=false;
  }

  onCancel(){
    this.forgotPasswordDiv=false;
    this.loginDiv=true;
  }

  onSubmit(){
    this.loginService.forgotPassword(this.loginModel)
     .subscribe(data=>{
       this.complexForm.reset();
       this.complexForm.controls['email'].setErrors(null);
       this.loginData=data;
       if(data.success==false){
         this.toastr.error('Entered email address is not registered as admin', 'Oops!');
       }else if (data.success==true) {
         this.toastr.success('Your password has been sent to email address please check your email and login', 'Success!');
       }
       console.log(JSON.stringify(data))
     })
  }

}
