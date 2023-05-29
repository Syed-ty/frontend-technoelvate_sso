import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InvoiceResponse } from '../models/invoice';
import { UserResponse } from '../models/user';
// import {projectResponse} from '../models/user'
@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  constructor( private http: HttpClient,
    private router: Router) { }

  //   public sharedData: Subject<any> = new Subject<any>();
  //   sharedData$: Observable<any> = this.sharedData.asObservable();

  //   private visitorID = new BehaviorSubject('abc@gmail.com');
  // currentVisitorId = this.visitorID.asObservable();

  getUser() {
    return this.http.get < {
      error: boolean,
      userData:UserResponse[]
    }> (`${environment.baseUrl}/user/get-alluser`)
  }
  addUser(data:any){
    return this.http.post<{
      error:boolean,
      userData:UserResponse,
      message:string
    }> (`${environment.baseUrl}/auth/add-register`,data)
  }

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
  // setData(updatedData:any) {
  //   this.sharedData.next(updatedData);
  //   this.visitorID.next(updatedData);
  // }
  getUserPaginaton(currentPage: number, pageSize: number) {
    return this.http.get<{
      error: boolean;
      message: string;
      response: any;
      totalmixed: number;
    }>(
      `${environment.baseUrl}/user/user-pagination?currentPage=${currentPage}&pageSize=${pageSize}`
    );
  }

    getProjectPaginaton(currentPage: number, pageSize: number) {
    return this.http.get<{
      error: boolean;
      message: string;
      response: any;
      totalmixed: number;
    }>(
      `${environment.baseUrl}/project/project-pagination?currentPage=${currentPage}&pageSize=${pageSize}`
    );
  }

 editUser(data:any,id:any){
  return this.http.put < {
    error:boolean,
    userData:UserResponse,
    message:string
  }> (`${environment.baseUrl}/user/update-user/${id}`,data)
 }
 deleteUser(id:any){
  return this.http.delete <{
    error:boolean,
    userData:UserResponse,
    message:string
  }> (`${environment.baseUrl}/user/delete-user/${id}`)
 }

 getUserByEmailId(email:any){
  return this.http.get<{
    error:boolean,
    response:any,
    message:string
  }> (`${environment.baseUrl}/user/getUser-email/${email}`)
 }

 getAllProject() {
  return this.http.get<{
    error: boolean;
    message : string;
    visitors: any
  } > (`${environment.baseUrl}/project/get-AllProject`)
}

addProject(data:any){
  return this.http.post<{
    error:boolean,
    response:any,
    message:string
  }> (`${environment.baseUrl}/project/add-project`,data)
}


getProjectById(id:any) {
  return this.http.get<{
    response: any;
    error: boolean;
    message : string;
    visitors: any
  } > (`${environment.baseUrl}/project/getProjectById/${id}`)
}


editProject(data:any,id:any){
return this.http.put< {
  error:boolean,
  response:any,
  message:string
}> (`${environment.baseUrl}/project/updateProject/${id}`,data)
}

deleteProject(id:any){
return this.http.delete<{
  error:boolean,
  response:any,
  message:string
}> (`${environment.baseUrl}/project/deleteProjectById/${id}`)
}

 getPayment(){
  return this.http.get <{
    error:Boolean,
    payment:PaymentResponse[],
    message:string
  }> (`${environment.baseUrl}/payment/get-AllPayment`)
 }
 addPayment(data:any){
  return this.http.post < {
    error:boolean,
    userData:UserResponse,
    message:string
  }> (`${environment.baseUrl}/payment/add-payment`,data)
}
 editPayment(data:any,id:any){
  return this.http.put < {
    error:boolean,
    userData:UserResponse,
    message:string
  }> (`${environment.baseUrl}/payment/updatePayment/${id}`,data)
 }
 deletePayment(id:any){
  return this.http.delete <{
    error:boolean,
    userData:UserResponse,
    message:string
  }> (`${environment.baseUrl}/payment/deletePaymentById/${id}`)
 }

 getInvoice(){
  return this.http.get <{
    error:Boolean,
    invoice:InvoiceResponse[],
    message:string
  }> (`${environment.baseUrl}/invoice/get-AllInvoice`)
 }
 editInvoice(data:any,id:any){
  return this.http.put < {
    error:boolean,
    userData:UserResponse,
    message:string
  }> (`${environment.baseUrl}/invoice/updateInvoice/${id}`,data)
 }
 deleteInvoice(id:any){
  return this.http.delete <{
    error:boolean,
    userData:UserResponse,
    message:string
  }> (`${environment.baseUrl}/invoice/deleteInvoiceById/${id}`)
 }
 addInvoice(data:any){
  return this.http.post < {
    error:boolean,
    userData:UserResponse,
    message:string
  }> (`${environment.baseUrl}/invoice/add-invoice`,data)
}

getInvoiceByProjectId(id:any){
  return this.http.get <{
    error:Boolean,
    message:string
    response:any,
  }> (`${environment.baseUrl}/invoice/getInvoiceById/${id}`)
 }


 getPaymentId(id:any) {
  return this.http.get<{
    response: any;
    error: boolean;
    message : string;
    visitors: any
  } > (`${environment.baseUrl}/payment/getPaymentById/${id}`)
}


getAllProjectData(){
  return this.http.get<{
    error:Boolean,
    message:string,
    response:any
  }> (`${environment.baseUrl}/project/get-AllProjectData`)
 }



 addresource(data:any){
  return this.http.post<{
    error:boolean,
    message:string,
    resourceData:any,
  }> (`${environment.baseUrl}/resource/add-resource`,data)
}


addMileStone(data:any){
  return this.http.post<{
    error:boolean,
    message:string,
    resourceData:any,
  }> (`${environment.baseUrl}/payment/add-milestone`,data)
}

 getResource(){
  return this.http.get<{
    error:Boolean,
    message:String,
    resourcedata:any,
  }> (`${environment.baseUrl}/resource/get-AllResource`)
 }

 getresourceByProjectId(id:string){
  return this.http.get <{
    error:Boolean,
    message:string
    response:any,
  }> (`${environment.baseUrl}/resource/getResourceById/${id}`)
 }

 getMileStoneByProjectId(id:string){
  return this.http.get <{
    error:Boolean,
    message:string
    response:any,
  }> (`${environment.baseUrl}/payment/getMileStoneById/${id}`)
 }

 editresource(data:any,id:any){
  return this.http.put<{
    error:boolean,
    message:string,
    response:any,
  }> (`${environment.baseUrl}/resource/updateResource/${id}`,data)
 }


 editMileStone(data:any,id:any){
  return this.http.put<{
    error:boolean,
    message:string,
    response:any,
  }> (`${environment.baseUrl}/payment/updateMileStone/${id}`,data)
 }


 deleteresource(id:any){
  return this.http.delete<{
    error:boolean,
    message:string,
    response:any,
  }> (`${environment.baseUrl}/resource/deleteResourceById/${id}`)
 }

 deleteMileStone(id:any){
  return this.http.delete<{
    error:boolean,
    message:string,
    response:any,
  }> (`${environment.baseUrl}/payment/deleteMileStoneById/${id}`)
 }


 getInvoiceofAllMonth(data:any){
  return this.http.get <{
    error:Boolean,
    message:string
    response:any,
  }> (`${environment.baseUrl}/invoice/get-Alldata/${data}`)
 }


 getPaymentofAllMonth(data:any){
  return this.http.get <{
    error:Boolean,
    message:string
    response:any,
  }> (`${environment.baseUrl}/invoice/get-Paymentdata/${data}`)
 }

 getinvoiceByQuater(data:any){
  return this.http.get <{
    error:Boolean,
    message:string
    response:any,
  }> (`${environment.baseUrl}/invoice/getInvoiceByQuaterMonths/${data}`)
 }


 getpaymentByQuater(data:any){
  return this.http.get <{
    error:Boolean,
    message:string
    response:any,
  }> (`${environment.baseUrl}/invoice/getPaymentByQuaterMonths/${data}`)
 }




}
