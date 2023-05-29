import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsermanagementService } from '../../services/usermanagement.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css'],
})
export class AddInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  spinner: boolean = false;
  inputValueNo: boolean = false;
  inputInvoiceNo: any;
  constructor(
    private userservice: UsermanagementService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
    this.invoiceForm = new FormGroup({
      invoiceNumber: new FormControl('', [Validators.required]),
      invoiceDate: new FormControl('', Validators.required),
      paymentterm: new FormControl('', Validators.required),
      invoiceAmount: new FormControl('', Validators.required),
      selectedMileStone:new FormControl(''),
      ProjectId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getInvoice();
    this.data = localStorage.getItem('projectId')
    this.getMileStoneById()
  }

  todayDate: Date = new Date();
  minDate: Date = new Date('1 January 2019');

  invoiceDetails: any;
  getInvoice() {
    this.userservice.getInvoice().subscribe((res) => {
      if (res) {
        this.invoiceDetails = res.invoice;
      }
    });

  }
  data:any

  createDateAsUTC(date: any) {
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      )
    );
  }

  cancel() {
    this.dialogRef.close();
  }

  inputData(event:any) {
    this.inputInvoiceNo = event.target.value;
  if( this.invoiceDetails?.find((x: { invoiceNumber: any; }) => x.invoiceNumber === this.inputInvoiceNo)){
    this.inputValueNo = true
    } else{
    this.inputValueNo = false
   }
  }

  SelectMileStone:any[] = []
  getMileStoneById(){
    this.spinner = true
    this.userservice.getMileStoneByProjectId(this.data).subscribe((res)=>{
      if(res){
        this.spinner = false
       res.response.forEach((ele:any)=>{
         this.SelectMileStone.push(ele.milestone)
       })
      }
    })
  }


  onSubmit(){
    this.spinner=true
    this.invoiceForm.get('ProjectId')?.setValue(this.data)
    this.invoiceForm.get('invoiceDate')?.setValue( this.createDateAsUTC(this.invoiceForm.get('invoiceDate')?.value));
    this.userservice.addInvoice(this.invoiceForm.value).subscribe((res)=>{
       if (!res.error) {
        this.spinner=false
        this.toastr.success(res.message);
        this.invoiceForm.reset();
        this.getInvoice();
        this.dialogRef.close('add');
      } else {
        this.toastr.error(res.message);
      }
    })
  }








}
