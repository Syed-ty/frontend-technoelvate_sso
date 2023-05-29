import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput:NgOtpInputComponent | undefined;
  otpForm!: FormGroup;
  userData: any;
  spinner:boolean=false
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    // placeholder: '',
    // inputStyles: {
    //   width: '40px',
    //   height: '40px',
    //   'background-color': ' #f9f3f3',
    //   'border-color': ' #f9f3f3',
    // },
  };
  constructor(
    private fb:FormBuilder,
    private router : Router,
    private toastr : ToastrService,
    private params: ActivatedRoute,
    private authService:AuthService
    ) {
    this.otpForm=this.fb.group({
      otp:['',Validators.required]
    },
    {
      validator: this.checkLength('otp')
    })
  }
  checkLength(otp: string) {
    return (formGroup: FormGroup) => {
      const otpLength = formGroup.controls[otp]
      if ((otpLength.value.length && otpLength.value.length < 6)) {
        otpLength.setErrors({
          length: true
        })
      } else {
        otpLength.setErrors({
          length: false
        })
      }
    }
  }

  ngOnInit(): void {
    // this.userData = JSON.parse(localStorage.getItem('userDetails') as string);
    this.params.queryParams.subscribe((params) => {
      this.userData = params['email'];
    },
    (err) => {
      if (err.status) {
        this.toastr.error(err.error.message);
      } else {
        this.toastr.error('CONNECTION_ERROR');
      }
    }
    );

  }

  onOtpChange(event:string) {
    this.otpForm.get('otp')?.setValue(event);
  }

  onSubmit(){
    this.spinner=true
   let userdata={
    email:this.userData,
    otp:this.otpForm.value.otp,
   }
   this.authService.VerifyOtpData(userdata).subscribe((res) => {
    if (!res.error) {
      this.spinner=false
      localStorage.setItem('otpResponse', JSON.stringify(res.response))
      this.toastr.success(res.message);
      this.router.navigate(['/dashboard', 'user-management'])
    }
    // else{
    //   this.spinner=false
    // }
   },(err) => {
     if (err.status) {
      this.spinner = false;
      this.toastr.error(err.error.message);
    } else {
      this.toastr.error('CONNECTION_ERROR');
    }
  });

  }

  resendOtp(){
    let userdata={
      email:this.userData,
     }
    this.authService.login(userdata).subscribe(res=>{
      if (!res.error) {
        this.toastr.success(res.message);
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

}
