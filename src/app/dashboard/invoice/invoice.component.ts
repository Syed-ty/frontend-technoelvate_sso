import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EditinvoiceDialogComponent } from '../model/editinvoice-dialog/editinvoice-dialog.component';
import { UsermanagementService } from '../services/usermanagement.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EditPaymentDetailsComponent } from '../model/edit-payment-details/edit-payment-details.component';
import { AddInvoiceComponent } from '../model/add-invoice/add-invoice.component';
import { AddViewpaymentComponent } from '../model/add-viewpayment/add-viewpayment.component';
import { EditResourceComponent } from '../model/edit-resource/edit-resource.component';
import { AddViewresourceComponent } from '../model/add-viewresource/add-viewresource.component';
import { AddViewmilestoneComponent } from '../model/add-viewmilestone/add-viewmilestone.component';
import { EditViewmilestoneComponent } from '../model/edit-viewmilestone/edit-viewmilestone.component';
import { EditMilestoneComponent } from '../model/edit-milestone/edit-milestone.component';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit,AfterViewInit {

  paymentColumns: string[] = ['position','recievedDate', 'totalAmount','transactionNumber','Action'];
  invoiceColumns: string[] = ['position','invoiceAmount', 'invoiceDate','selectedMileStone','invoiceNumber','paymentterm','Action'];

  resourceColumns: string[] = ['position','employeeId','fullName', 'emailId','payment','Action'];

  mileStoneColumns: string[] = ['position','milestone','paymentPercent', 'milestonedetails','mileStoneAmount','startMileStoneDate','endMileStoneDate','actualEndDate','Action'];

  dataSource:MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  invoicedataSource:MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  resourcedataSource:MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);

  mileStonedataSource:MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);


  searchText = '';
  characters = [
    'Ant-Man',
    'Aquaman',
    'Asterix',
    'The Atom',
    'The Avengers',
    'Batgirl',
    'Batman',
    'Batwoman',
  ]
  spinner:boolean=true
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  paramsdata:any
  projectForm!:FormGroup
  data:any
  userDetails:any;


  constructor(public dialog: MatDialog,
    private userservice:UsermanagementService,
    public dialogss: MatDialog,
    private router :Router,
    private spinnerService: NgxSpinnerService,
    private toaster:ToastrService
    ) {
      // this.data =  this.router.getCurrentNavigation()?.extras.state
      this.projectForm=new FormGroup({
        projectName: new FormControl('', [Validators.required]),
        projectCost: new FormControl('', [Validators.required]),
        clientName: new FormControl('', [Validators.required]),
        projectType: new FormControl('', Validators.required),
        startDate: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required),
        projectLead: new FormControl('', Validators.required),
        projectManager: new FormControl('', Validators.required),
        teamLead: new FormControl('', Validators.required),
        businessDevelopmentManger: new FormControl('', Validators.required),
        status:new FormControl('',Validators.required),
        Remarks: new FormControl('', Validators.required),
      })
        }

    sharedData:any;
    subscription:any;
     projectDetails:any
     projectId:any
  ngOnInit(): void {
    this.data = localStorage.getItem('projectId')
    setTimeout(() => {
      this.getInvoice();
    },100);
    setTimeout(() => {
      this.getPaymentByProjectId()
    }, 200);
    this.getProjectByIdData();
    this.getResourceById();
    this.getMileStoneById()
    // this.subscription = this.userservice.currentVisitorId.subscribe(email => {
    // });
  }




  invoiceDetails:any=[]
  invoicedAmountdata:any=0;
  invoicePending:any=0;
  yettobeinvoice:any=0;
  totalcost:any=0;
  invoicedetails:Boolean = false
  numbers: any[] = [];
  getInvoice() {
    this.spinner=true;
    this.userservice.getInvoiceByProjectId(this.data).subscribe((res) => {
      if (!res.error) {
        this.spinner=false
        this.invoiceDetails = res.response
         this.invoicedAmountdata =0;
        this.invoiceDetails.forEach((ele:any)=>{
          this.invoicedAmountdata += parseInt(ele.invoiceAmount)
          this.yettobeinvoice  = this.totalcost - this.invoicedAmountdata
        })

        this.invoicedataSource=new MatTableDataSource([
          ...this.invoiceDetails
        ])
      }
    })
  }

  openInvoice() {
    const dialogRef= this.dialogss.open(AddInvoiceComponent,{
      width:'450px',
      // height:'75%',
      // data : row
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        this.getInvoice();
        setTimeout(() => {
          this.getPaymentByProjectId()
        }, 200);
      }
    });
  }

resourceDetails:any = []
getResourceById(){
  this.spinner = true
  this.userservice.getresourceByProjectId(this.data).subscribe((res)=>{
    if(res){
      this.spinner = false
      this.resourceDetails = res.response
    }
    this.resourcedataSource = new MatTableDataSource([
      ...this.resourceDetails
    ])
  })
}



getMileStoneById(){
  this.spinner = true
  this.userservice.getMileStoneByProjectId(this.data).subscribe((res)=>{
    if(res){
      this.spinner = false
      this.mileStoneDetails = res.response
    }
    this.mileStonedataSource = new MatTableDataSource([
      ...this.mileStoneDetails
    ])
  })
}



  openPayment() {
    const dialogRef= this.dialog.open(AddViewpaymentComponent,{
      width:'500px',
      // height:'85%',
      // data:row
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        setTimeout(() => {
          this.getPaymentByProjectId()
        }, 200);
      }
    });
  }

  paymentNotDone : Boolean  = false
  paymentDetails:any=[]
  totalamountpaid:any = 0
  getPaymentByProjectId(){
    this.userservice.getPaymentId(this.data).subscribe((res) => {
      if (res) {
        this.paymentDetails=res.response;
        this.totalamountpaid = 0
        this.paymentDetails.forEach((ele:any)=>{
          this.totalamountpaid += parseInt(ele.totalAmount)
          if (this.invoicedAmountdata !== 0) {
            this.invoicePending=this.invoicedAmountdata - this.totalamountpaid
          }
        })
      }
      this.dataSource=new MatTableDataSource([
        ...this.paymentDetails
      ])
    })
  }



  back() {
    this.router.navigateByUrl('/dashboard/project-management');
  }

  projectName:any
  projectCost:any
  clientName:any
  projectType:any
  startDate:any
  endDate:any
  projectLead:any
  projectManager:any
  teamLead:any
  businessDevelopmentManger:any
  status:any
  Remarks:any

  mileStoneDetails:any = []

  getProjectByIdData(){
    this.userservice.getProjectById(this.data).subscribe((res)=>{
      if(!res.error){
      this.projectName=res.response.projectName;
      this.clientName=res.response.clientName;
      this.projectCost=res.response.projectCost;
      this.totalcost=res.response.projectCost;
      this.projectType=res.response.projectType;
      this.startDate=res.response.startDate;
      this.endDate=res.response.endDate;
      this.projectLead=res.response.projectLead;
      this.projectManager=res.response.projectManager;
      this.teamLead=res.response.teamLead;
      this.businessDevelopmentManger=res.response.businessDevelopmentManger;
      this.status=res.response.status;
      this.Remarks=res.response.Remarks
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  editpaymentDialog(row:any){
    const dialogRef= this.dialogss.open(EditPaymentDetailsComponent,{
      width:'450px',
      data:row
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        setTimeout(() => {
          this.getPaymentByProjectId()
        }, 200);
        this.spinner=false;
      }
    });
  }


  deleteId: any;
  deleteData: any;
  ProjectName: any;
  deletepayment(data: any) {
    this.deleteData = data;
  }

  // deletepayment(id:any){
  //   this.userservice.deletePayment(id).subscribe(res => {
  //     if (!res.error) {
  //       this.toaster.success(res.message);
  //       this.getPaymentByProjectId();
  //       this.getProjectByIdData()
  //     } else {
  //       this.toaster.error(res.message);
  //     }
  //   })
  //   this.paymentDetails.forEach((ele:any, i:any) => {
  //     if (ele._id === id) {
  //       this.paymentDetails.splice(i, 1);
  //     }
  //   })
  //   this.getPaymentByProjectId()
  // }




  editinvoiceDialog(row:any){
    const dialogRef= this.dialogss.open(EditinvoiceDialogComponent,{
      width:'450px',
      data:row
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        this.getInvoice();
        setTimeout(() => {
          this.getPaymentByProjectId()
        }, 200);
        this.spinner=false;
      }
    });
  }


  editresourceDialog(row:any){
    const dialogRef= this.dialogss.open(EditResourceComponent,{
      width:'450px',
      data:row
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        this.getResourceById();
        this.spinner=false;
      }
    });
  }


  editMileStoneDialog(row:any){
    const dialogRef= this.dialogss.open(EditViewmilestoneComponent,{
      width:'450px',
      data:row
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        this.getMileStoneById();
        this.spinner=false;
      }
    });
  }

  editEndDateStoneDialog(row:any){
    const dialogRef= this.dialogss.open(EditMilestoneComponent,{
      width:'450px',
      data:row
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        this.getMileStoneById();
        this.spinner=false;
      }
    });
  }


  invoiceDeleteData: any;
  deleteinvoice(data: any) {
    this.invoiceDeleteData = data;
  }
  // deleteinvoice(id:any){
  //   this.spinner=true
  //   this.userservice.deleteInvoice(id).subscribe(res => {
  //     if (!res.error) {
  //       this.spinner=false
  //       this.toaster.success(res.message);
  //       this.getInvoice();
  //       this.getProjectByIdData();
  //     } else {
  //       this.toaster.error(res.message);
  //     }
  //   })
  //   this.invoiceDetails.forEach((ele:any, i:any) => {
  //     if (ele._id === id) {
  //       this.invoiceDetails.splice(i, 1);
  //     }
  //   })
  //   this.getInvoice()
  // }
  resourceDeleteData: any;
  deleterResource(data: any) {
    this.resourceDeleteData = data;
  }


  mileStoneDeleteData: any;
  deleterMileStone(data: any) {
    this.mileStoneDeleteData = data;
  }



  // deleterResource(id:any){
  //   this.spinner=true
  //   this.userservice.deleteresource(id).subscribe(res => {
  //     if (!res.error) {
  //       this.spinner=false
  //       this.toaster.success(res.message);
  //     } else {
  //       this.toaster.error(res.message);
  //     }
  //   })
  //   this.resourceDetails.forEach((ele:any, i:any) => {
  //     if (ele._id === id) {
  //       this.resourceDetails.splice(i, 1);
  //     }
  //     this.resourcedataSource = new MatTableDataSource([
  //       ...this.resourceDetails
  //     ])
  //   })
  // }

  openResource() {
    const dialogRef= this.dialog.open(AddViewresourceComponent,{
      width:'450px',
      // data : row
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        this.getResourceById();
      }
    });
  }

  openMileStone() {
    const dialogRef= this.dialog.open(AddViewmilestoneComponent,{
      width:'450px',
      // data : row
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        this.getMileStoneById();
      }
    });
  }


    // deletepayment(id:any){
  //   this.userservice.deletePayment(id).subscribe(res => {
  //     if (!res.error) {
  //       this.toaster.success(res.message);
  //       this.getPaymentByProjectId();
  //       this.getProjectByIdData()
  //     } else {
  //       this.toaster.error(res.message);
  //     }
  //   })
  //   this.paymentDetails.forEach((ele:any, i:any) => {
  //     if (ele._id === id) {
  //       this.paymentDetails.splice(i, 1);
  //     }
  //   })
  //   this.getPaymentByProjectId()
  // }

  deletePaymentData() {
    this.userservice.deletePayment(this.deleteData).subscribe((res) => {
      if (!res.error) {
              this.toaster.success(res.message);
              setTimeout(() => {
                this.getPaymentByProjectId()
              }, 200);
            } else {
              this.toaster.error(res.message);
            }
    });
    this.paymentDetails.forEach((ele: any, i: any) => {
      if (ele._id === this.deleteData) {
        this.paymentDetails.splice(i, 1);
      }
    });
    this.getPaymentByProjectId();
  }
  deleteInvoiceData() {
    this.userservice.deleteInvoice(this.invoiceDeleteData).subscribe((res) => {
      if (!res.error) {
        this.toaster.success(res.message);
        this.getInvoice();
        setTimeout(() => {
          this.getPaymentByProjectId()
        }, 200);
      } else {
        this.toaster.error(res.message);
      }
    });
    this.invoiceDetails.forEach((ele: any, i: any) => {
      if (ele._id === this.invoiceDeleteData) {
        this.invoiceDetails.splice(i, 1);
      }
    });
    if (this.invoiceDetails.length < 1) {
      this.invoicePending = 0;
      this.yettobeinvoice = 0
    }
    this.getInvoice();
  }
  deleteResourceData() {
    this.userservice.deleteresource(this.resourceDeleteData).subscribe((res) => {
      if (!res.error) {
        this.spinner = false
        this.toaster.success(res.message);
        this.getResourceById();
      } else {
        this.toaster.error(res.message);
      }
    });
    this.resourceDetails.forEach((ele: any, i: any) => {
      if (ele._id === this.resourceDeleteData) {
        this.resourceDetails.splice(i, 1);
      }
    });
    this.getResourceById();
  }

  deleteMileStoneData() {
    this.userservice.deleteMileStone(this.mileStoneDeleteData).subscribe((res) => {
      if (!res.error) {
        this.spinner = false
        this.toaster.success(res.message);
        this.getMileStoneById();
      } else {
        this.toaster.error(res.message);
      }
    });
    this.mileStoneDetails.forEach((ele: any, i: any) => {
      if (ele._id === this.resourceDeleteData) {
        this.resourceDetails.splice(i, 1);
      }
    });
    this.getMileStoneById();
  }

}




