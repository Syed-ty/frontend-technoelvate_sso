import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  InvalidLoginForm!:FormGroup
  spinner:boolean=false
  // signinForm!: FormGroup;
  submitted = false;
  @ViewChild('triggerForm', {
    static: false,
  })
  triggerForm: NgForm | undefined;
  constructor(private router:Router,
    private toastr: ToastrService,
    private authService:AuthService) {

      this.InvalidLoginForm = new FormGroup({
        inemail:new FormControl('')
      })

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9._%+-]+@testyantra\.com|in$/),
        Validators.email,
      ]),
      // password: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern('[a-zA-z0-9@]{8,15}'),
      //   Validators.minLength(8),
      //   Validators.maxLength(15),
      // ]),
    });
    // this.signinForm =new FormGroup({
    //   email: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern(/^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}$/),
    //     Validators.email,
    //   ]),
    // })
   }

  ngOnInit(): void {
  }
  get loginFormControl() {
    return this.loginForm.controls;
  }
  triggerSubmit() {
    if (!this.triggerForm) {
      console.warn('triggerForm not assigned a value');
    } else {
      if (this.triggerForm.valid) {
        this.triggerForm.ngSubmit.emit();
      }
    }
  }
  onSubmit(){
    this.spinner=true
     this.authService.login(this.loginForm.value).subscribe(res=>{
      if (!res.error) {
        this.spinner=false
        this.toastr.success(res.message);
        localStorage.setItem('UserDetails',JSON.stringify(this.loginForm.value))
        this.router.navigate(['/auth', 'otp'],{
          queryParams: { email: this.loginForm.value.email }
        })
      }
     },(err) => {
      // this.spinner = false;
      if (err.status) {
        this.toastr.error(err.error.message);
      } else {
        this.toastr.error('CONNECTION_ERROR');
      }
    });
  }

  onRegisterSubmit(){
  }
}
