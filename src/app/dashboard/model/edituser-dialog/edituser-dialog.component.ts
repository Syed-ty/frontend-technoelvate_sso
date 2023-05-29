import { Component, Inject, OnInit,  ViewChild,AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserResponse } from '../../models/user';
import { UsermanagementService } from '../../services/usermanagement.service';
import { UserManagementComponent } from '../../user-management/user-management.component';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-edituser-dialog',
  templateUrl: './edituser-dialog.component.html',
  styleUrls: ['./edituser-dialog.component.css']
})
export class EdituserDialogComponent implements OnInit,AfterViewInit {
  [x: string]: any;
  userForm!:FormGroup
  spinner:boolean=false

  @ViewChild('myCheckbox') checkbox!: MatCheckbox;
  @ViewChild('mangementSystemCheckbox') mangementSystemCheckbox!: MatCheckbox;

  @ViewChild('marketcheckbox') marketcheckbox!: MatCheckbox;

  @ViewChild('resourcePoolcheckbox') resourcePoolcheckbox!: MatCheckbox;

  @ViewChild('clientOnBoardcheckbox') clientOnBoardcheckbox!: MatCheckbox;

  @ViewChild('psSystemCheckbox') psSystemCheckbox!: MatCheckbox;


  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    private userservice:UsermanagementService, @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<UserManagementComponent>,
    private toastr: ToastrService,) {
      this.userForm=new FormGroup({
        fullName:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/)]),
        email:new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@testyantra\.com|in$/)]),
        employeeId:new FormControl('',[Validators.required,Validators.maxLength(10) ]),
        designation:new FormControl('',Validators.required),
        phoneNumber:new FormControl('',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]),
        gender:new FormControl('',Validators.required),
        department:new FormControl('',Validators.required),
        benchHiring:new FormControl(''),
        marketHiring:new FormControl(''),
        resourcePool:new FormControl(''),
        managementSystem:new FormControl(''),
        pssystem:new FormControl(''),
        clientOnBoard:new FormControl(''),
      })

  }

  ngOnInit(): void {


  }
  userDetails!:UserResponse[]
  getUser() {
    this.userservice.getUser().subscribe((res) => {
      if (res) {
        this.userDetails = res.userData;
      }
    })
  }

  ngAfterViewInit(){
    this.spinner = true
    this.getUser()
    this.userservice.getUser().subscribe((res) => {
      if (res) {
        res.userData.forEach((ele:any)=>{
          if(ele._id === this.editData._id){
            setTimeout(() => {
              if(ele.benchHiring !== ''){
                this.checkbox.checked = true
                this.userForm.get('benchHiring')?.setValue('Bench Hiring')
               }
               if(ele.managementSystem !== ''){
                this.mangementSystemCheckbox.checked = true
                this.userForm.get('managementSystem')?.setValue('Management System')
              }
               if(ele.marketHiring !== ''){
                this.marketcheckbox.checked = true
                this.userForm.get('marketHiring')?.setValue('Market Hiring')
               }
               if(ele.pssystem !== '' ){
                this.psSystemCheckbox.checked = true
                this.userForm.get('pssystem')?.setValue('PS System')
               }
               if(ele.clientOnBoard !== ''){
                this.clientOnBoardcheckbox.checked = true
                this.userForm.get('clientOnBoard')?.setValue('Client On Board')
               }
               if(ele.resourcePool !== ''){
                this.resourcePoolcheckbox.checked = true
                this.userForm.get('resourcePool')?.setValue('Resource Pool')
               }

          this.userForm.controls['fullName'].setValue(ele.fullName);
          this.userForm.controls['email'].setValue(ele.email);
          this.userForm.controls['employeeId'].setValue(ele.employeeId);
          this.userForm.controls['gender'].setValue(ele.gender);
          this.userForm.controls['designation'].setValue(ele.designation);
          this.userForm.controls['phoneNumber'].setValue(ele.phoneNumber);
          this.userForm.controls['department'].setValue(ele.department);
          this.spinner = false
            }, 500);
          }
        })
      }
    })


  }


  benchEvent(event:any){
    if(event.checked === true){
     this.userForm.get('benchHiring')?.setValue('Bench Hiring')
    }
    if(event.checked === false){
     this.userForm.get('benchHiring')?.setValue('')
    }
    }

    marketEvent(event:any){
     if(event.checked === true){
      this.userForm.get('marketHiring')?.setValue('Market Hiring')
     }
     if(event.checked === false){
       this.userForm.get('marketHiring')?.setValue('')
      }
     }


     resourcePoolEvent(event:any){
       if(event.checked === true){
        this.userForm.get('resourcePool')?.setValue('Resource Pool')
       }
       if(event.checked === false){
         this.userForm.get('resourcePool')?.setValue('')
        }
       }

       managementSystemEvent(event:any){
         if(event.checked === true){
          this.userForm.get('managementSystem')?.setValue('Management System')
         }
         if(event.checked === false){
           this.userForm.get('managementSystem')?.setValue('')
          }
         }


         psSystemEvent(event:any){
           if(event.checked === true){
            this.userForm.get('pssystem')?.setValue('PS System')
           }
           if(event.checked === false){
             this.userForm.get('pssystem')?.setValue('')
            }
           }

           clientOnBoardEvent(event:any){
             if(event.checked === true){
              this.userForm.get('clientOnBoard')?.setValue('Client On Board')
             }
             if(event.checked === false){
               this.userForm.get('clientOnBoard')?.setValue('')
              }
             }




  onSubmit(){
    this.spinner=true
   this.userservice.editUser(this.userForm.value,this.editData._id).subscribe((res)=>{
    if (!res.error) {
      this.spinner=false
      this.toast.success(res.message);
      this.userForm.reset();
      this.dialogRef.close('update');
    } else {
      this.toast.error(res.message);
    }
  }, err => {
    if (err.status) {
      this.toast.error(err.error.message);
    } else {
      this.toast.error("CONNECTION_ERROR");
    }
  });
}
cancel(){
  this.dialogRef.close();
}
}
