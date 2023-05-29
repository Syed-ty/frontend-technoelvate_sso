import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

 login(data:any) {
    return this.http.post < {
      error: boolean,
      message: string,
      response:any
    } > (`${environment.baseUrl}/auth/login`,data)
  }

  VerifyOtpData(userData: any) {
    return this.http.post<{ error: boolean; message: string;response:any }>(
      `${environment.baseUrl}/auth/verify-otp`,
      userData
    );
  }

  getUser() {
    let user = JSON.parse(localStorage.getItem('UserDetails') as string);
    if (user) {
      return user;
    }
  }
  getOtpData() {
    let data = JSON.parse(localStorage.getItem('otpResponse') as string);
    if (data) {
      return data;
    }
  }
}
