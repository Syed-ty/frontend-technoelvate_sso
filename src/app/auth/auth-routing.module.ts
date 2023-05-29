import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AdminGuard } from './guard/admin.guard';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  { path: '', component: AuthComponent },
{
  path:'login',
  component:LoginComponent,

},
// {
//   path:'register',component:RegisterComponent
// },
{
  path:'otp',component:OtpComponent,
  canActivate: [AdminGuard],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
