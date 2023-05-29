import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { UsermanagementService } from '../services/usermanagement.service';
import { FormControl, FormGroup} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {
  @ViewChild('barCanvas') barCanvas: ElementRef | undefined;
  @ViewChild('barCanvaspayment') barCanvaspayment: ElementRef | undefined;

  @ViewChild('invoiceCanvas') invoiceCanvas: ElementRef | undefined;
  @ViewChild('paymentCanvas') paymentCanvas: ElementRef | undefined;

  @ViewChild('invoiceCurrentByQuaterCanvas') invoiceCurrentByQuaterCanvas: ElementRef | undefined;
  @ViewChild('invoiceByQuaterCanvas') invoiceByQuaterCanvas: ElementRef | undefined;

  @ViewChild('paymentCurrentByQuaterCanvas') paymentCurrentByQuaterCanvas: ElementRef | undefined;
  @ViewChild('paymentByQuaterCanvas') paymentByQuaterCanvas: ElementRef | undefined;


  barChart:any;
  spinner:boolean=true
  invoiceForm!:FormGroup
  constructor(
     private userService :UsermanagementService,
     private toastr:ToastrService,
    ) {
    this.invoiceForm=new FormGroup({
      invoiceDate:new FormControl(''),
      paymentDate:new FormControl(''),
      invoiceDateByQuater: new FormControl(''),
      paymentDateByQuater: new FormControl('')

    })
   }

   Currentyear:any
   YearArray:any = []
   finalArray:any = []
   currentdata:any;
  ngOnInit(): void {
    this.getAllData();
    this.Currentyear = new Date().getFullYear()
    for(let i=2019;i<=this.Currentyear;i++){
       this.YearArray.push(i)
    }

    this.currentYear = new Date().getFullYear().toString()
   this.currentdata = this.Currentyear+'April'+ '-' + (this.Currentyear + 1) + 'March'

    this.YearArray.forEach((ele :any) =>{
      this.finalArray.push(ele + 'April' + '-' + (ele + 1) + 'March')

    });
       this.invoiceForm.get('invoiceDate')?.setValue(this.Currentyear)
       this.invoiceForm.get('paymentDate')?.setValue(this.Currentyear)
       this.invoiceForm.get('invoiceDateByQuater')?.setValue(this.currentdata)
       this.invoiceForm.get('paymentDateByQuater')?.setValue(this.currentdata)

  }

  allProjectData:any;
  totalInvoicepending:any
  totalyettobeInvoiced:any
  totalProjects:any
  invoiceResponse:any
  projectCostdata:any
  invoiceResponsedata:any
  getAllData(){
    this.spinner = true
    this.userService.getAllProject().subscribe((res)=>{
      this.spinner = false
      this.totalProjects = res.visitors.length
      this.userService.getAllProjectData().subscribe((res)=>{
        this.allProjectData = res.response
        this.totalInvoicepending = parseInt(this.allProjectData.invoiceCost) - parseInt(this.allProjectData.totalPayment)
        this.totalyettobeInvoiced = parseInt(this.allProjectData.projectCost) - parseInt(this.allProjectData.invoiceCost)
      })
      res.visitors.forEach((ele:any)=>{
        this.userService.getInvoiceByProjectId(ele._id).subscribe((data)=>{
            this.invoiceResponse = data.response
        })

      })
      // res.visitors.forEach((ele:any)=>{
      //   this.userService.getInvoiceByProjectId(ele._id).subscribe((res)=>{
      //     this.invoiceResponse = res.response
      //     if(res.response.length >0)
      //     {
      //       this.userService.getAllProjectData().subscribe((res)=>{
      //         this.allProjectData = res.response
      //         this.totalInvoicepending = parseInt(this.allProjectData.invoiceCost) - parseInt(this.allProjectData.totalPayment)
      //         this.totalyettobeInvoiced = parseInt(this.allProjectData.projectCost) - parseInt(this.allProjectData.invoiceCost)
      //       })
      //     }
      //   })
      //   const sum = (...visitors: any[]) => {
      //     var total = 0;
      //     res.visitors.forEach((arg:any) => {
      //       total += arg.projectCost;
      //     });
      //     this.projectCostdata = total
      //   }
      //   sum(1, 3);
      // })
    })
  }

  ngAfterViewInit(): void {
    this.getInvoiceByCurrentDate();
    this.getpaymentByCurrentDate();
    this.getInvoiceByQuater();
    this.getPaymentByQuater()
  }


  currentYear :any
  newArr:any
  arr:any=[]= [0,0,0,0,0,0,0,0,0,0,0,0];
  currentPayment:any=[]= [0,0,0,0,0,0,0,0,0,0,0,0];

  getInvoiceByCurrentDate(){
    this.userService.getInvoiceofAllMonth(this.currentYear).subscribe((res)=>{
      if(res.response.length > 0 ){
        this.currentInvoiceYear = true;
        this.invoiceYear = false
        this.Nodata  = false
        res.response.forEach((ele:any,i:any) => {
          this.arr.forEach((ar:any,j:number)=>{
            if (ele.index-1==j) {
             this.arr.splice(j,1,ele.amount)
           }
         })
         setTimeout(() => {
          this.barChartMethod();
         }, 10);
       }
       );
      }
      else{
        this.invoiceYear = false
        this.currentInvoiceYear = false;
        this.Nodata  = true
      }
    })
  }

  getpaymentByCurrentDate(){
    this.userService.getPaymentofAllMonth(this.currentYear).subscribe((res)=>{
      if(res.response.length > 0){
        this.currentPaymentYear = true
        this.paymentYear = false
        this.NodataPayment = false
        res.response.forEach((element:any,i:any) => {
          this.currentPayment.forEach((data:any,j:number)=>{
            if (element.index-1 === j) {
             this.currentPayment.splice(j,1,element.amount)
            }
          })
          setTimeout(() => {
            this.paymentBarChart()
          }, 10);
       });
      }
      else{
        this.currentPaymentYear = false
        this.paymentYear = false
        this.NodataPayment =  true
      }
    })
  }

  barChartMethod() {
    if(this.barChart){
      this.barChart.destroy()
    }
    this.barChart = new Chart(this.barCanvas?.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
          {
            label: 'Invoice',
            data: this.arr,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        },
      },
    });

    }


    paymentbar:any
  paymentBarChart(){
    if(this.paymentbar){
         this.paymentbar.destroy()
    }
    this.paymentbar = new Chart(this.barCanvaspayment?.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
          {
            label: 'Payment',
            data:this.currentPayment,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },

        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        },
      },
    });
  }

  todayDate : Date = new Date();
  minDate : Date = new Date("1 January 2019");


  currentInvoiceYear:Boolean = true;
  invoiceYear:Boolean = false;

  currentPaymentYear:Boolean = true;
  paymentYear:Boolean = false

  paymentArr:any=[]= [];
  NodataPayment:Boolean = false
  onSelectionPayment(event:any){
    let dateValue = event.value.toString()
   this.paymentYear = true;
   this.currentPaymentYear = false;
   this.NodataPayment = false;
   this.userService.getPaymentofAllMonth(dateValue).subscribe((res)=>{
    if(res.response.length >0 ){
      this.paymentArr = [0,0,0,0,0,0,0,0,0,0,0,0];
      res.response.forEach((element:any,i:any) => {
        this.paymentArr.forEach((data:any,j:number)=>{
          if (element.index-1==j) {
           this.paymentArr.splice(j,1,element.amount)
          }
        })
        setTimeout(() => {
          this.paymentChart()
        }, 9);
     });
    }
    else{
     this.NodataPayment = true;
     this.currentPaymentYear = false;
     this.paymentYear = false;
    }

  })

  }

  invoiceArr:any=[]= [];
  Nodata:Boolean = false
  onSelectionChanged(event:any){
    let data = (event.value).toString()
    this.invoiceYear = true;
    this.currentInvoiceYear = false
    this.Nodata = false
    this.userService.getInvoiceofAllMonth(data).subscribe((res)=>{
      if(res.response.length > 0){
        this.invoiceArr = [0,0,0,0,0,0,0,0,0,0,0,0];
        res.response.forEach((ele:any,i:any) => {
          this.invoiceArr.forEach((ar:any,j:number)=>{
            if (ele.index-1 == j) {
             this.invoiceArr.splice(j,1,ele.amount)
            }
           })
           setTimeout(() => {
            this.invoiceChart()
           }, 10);
         });
      }
      else{
        this.currentInvoiceYear = false;
        this.invoiceYear = false;
        this.Nodata = true
      }

    })
  }

  invoicedataChart:any
  invoiceChart() {
    if(this.invoicedataChart){
      this.invoicedataChart.destroy()
    }
    this.invoicedataChart = new Chart(this.invoiceCanvas?.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
          {
            label: 'Invoice',
            data: this.invoiceArr,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        },
      },
    });
  }
  paymentDataChart:any
  paymentChart(){
    if(this.paymentDataChart){
      this.paymentDataChart.destroy()
    }
    this.paymentDataChart = new Chart(this.paymentCanvas?.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
          {
            label: 'Payment',
            data:this.paymentArr,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },

        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        },
      },
    });
  }


  QuaterArray:any=[]= [0,0,0,0];

  getInvoiceByQuater(){
     this.userService.getinvoiceByQuater(this.currentdata).subscribe((res)=>{
      if(res.response.length >0){
        this.currentInvoiceYearQuater = true;
        this.invoiceYearQuater = false;
        this.NodataFound = false
        res.response.forEach((element:any)=>{
          this.QuaterArray.forEach((data:any,j:number)=>{
          if (element.id === j) {
            this.QuaterArray.splice(j,1,element.amount)
           }
        })
        setTimeout(() => {
          this.invoiceCurrentMethod();
        }, 10);
      })
      }
      else{
        this.currentInvoiceYearQuater = false;
        this.invoiceYearQuater = false;
        this.NodataFound = true
      }
     })
  }

  lineChart:any
  invoiceCurrentMethod() {
    if(this.lineChart){
      this.lineChart.destroy()
    }
    this.lineChart = new Chart(this.invoiceCurrentByQuaterCanvas?.nativeElement, {
      type: 'line',

      data: {
        labels: ['April-June','July-Sept','Oct-Dec','Jan-March'],
        datasets: [
          {
            label: 'Invoice-By-Quater',
            data: this.QuaterArray,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              // 'rgba(54, 162, 235, 0.2)',
              // 'rgba(255, 206, 86, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              // 'rgba(54, 162, 235, 1)',
              // 'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              //  'rgba(153, 102, 255, 1)',
              //  'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        },
      },
    });

    }

  currentInvoiceYearQuater:Boolean = true
  invoiceYearQuater:Boolean = false;
  NodataFound:Boolean = false

  invoiceQuaterArr:any=[]= [];

  onSelectionChangedByQuater(event:any){
    let data = (event.value).toString()
    this.invoiceYearQuater = true;
    this.currentInvoiceYearQuater = false
    this.NodataFound = false
    this.userService.getinvoiceByQuater(data).subscribe((res)=>{
      if(res.response.length > 0){
        this.invoiceQuaterArr = [0,0,0,0];
        res.response.forEach((ele:any,i:any) => {
          this.invoiceQuaterArr.forEach((ar:any,j:number)=>{
            if (ele.id == j) {
             this.invoiceQuaterArr.splice(j,1,ele.amount)
            }
           })
           setTimeout(() => {
            this.invoiceLineChartMethod()
           }, 10);
         });
      }
      else{
        this.currentInvoiceYearQuater = false;
        this.invoiceYearQuater = false;
        this.NodataFound = true
      }

    })
  }

  invoicelineChart:any
  invoiceLineChartMethod() {
    if(this.invoicelineChart){
      this.invoicelineChart.destroy()
    }
    this.invoicelineChart = new Chart(this.invoiceByQuaterCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: ['April-June','July-Sept','Oct-Dec','Jan-March'],
        datasets: [
          {
            label: 'Invoice-By-Quater',
            data: this.invoiceQuaterArr,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              // 'rgba(54, 162, 235, 0.2)',
              // 'rgba(255, 206, 86, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              // 'rgba(54, 162, 235, 1)',
              // 'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              //  'rgba(153, 102, 255, 1)',
              //  'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        },
      },
    });

    }

    currentPaymentYearQuater:Boolean = true
    paymentYearQuater:Boolean = false;
    NoPaymnetdataFound:Boolean = false


    paymentQuaterArray:any=[]= [0,0,0,0];

    getPaymentByQuater(){
       this.userService.getpaymentByQuater(this.currentdata).subscribe((res)=>{
        if(res.response.length > 0){
          this.currentPaymentYearQuater = true;
          this.paymentYearQuater = false;
          this.NoPaymnetdataFound = true
          res.response.forEach((element:any)=>{
            this.paymentQuaterArray.forEach((data:any,j:number)=>{
            if (element.id === j) {
              this.paymentQuaterArray.splice(j,1,element.amount)
             }
          })
          setTimeout(() => {
            this.paymentCurrentMethod();
          }, 10);
        })
        }
        else{
          this.currentPaymentYearQuater = false;
          this.paymentYearQuater = false;
          this.NoPaymnetdataFound = true
        }

       })
    }

    linedataChart:any
  paymentCurrentMethod() {
    if(this.linedataChart){
      this.linedataChart.destroy()
    }
    this.linedataChart = new Chart(this.paymentCurrentByQuaterCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: ['April-June','July-Sept','Oct-Dec','Jan-March'],
        datasets: [
          {
            label: 'Payment-By-Quater',
            data: this.paymentQuaterArray,
            backgroundColor: [
              // 'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              // 'rgba(255, 206, 86, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              // 'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              // 'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              //  'rgba(153, 102, 255, 1)',
              //  'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        },
      },
    });

    }



    paymentQuaterArr:any=[]= [];

    onPaymentSelectionChangedByQuater(event:any){
      let data = (event.value).toString()
      this.paymentYearQuater = true;
      this.currentPaymentYearQuater = false
      this.NoPaymnetdataFound = false
      this.userService.getpaymentByQuater(data).subscribe((res)=>{
        if(res.response.length > 0){
          this.paymentQuaterArr = [0,0,0,0];
          res.response.forEach((ele:any,i:any) => {
            this.paymentQuaterArr.forEach((ar:any,j:number)=>{
              if (ele.id === j) {
               this.paymentQuaterArr.splice(j,1,ele.amount)
              }
             })
             setTimeout(() => {
              this.paymentLineChartMethod()
             }, 10);
           });
        }
        else{
          this.currentPaymentYearQuater = false;
          this.paymentYearQuater = false;
          this.NoPaymnetdataFound = true
        }

      })
    }

    paymentlineChart:any
    paymentLineChartMethod() {
      if(this.paymentlineChart){
        this.paymentlineChart.destroy()
      }
      this.paymentlineChart = new Chart(this.paymentByQuaterCanvas?.nativeElement, {
        type: 'line',
        data: {
          labels: ['April-June','July-Sept','Oct-Dec','Jan-March'],
          datasets: [
            {
              label: 'Payment-By-Quater',
              data: this.paymentQuaterArr,
              backgroundColor: [
                // 'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                // 'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                //  'rgba(153, 102, 255, 1)',
                //  'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
          },
        },
      });

      }

}
