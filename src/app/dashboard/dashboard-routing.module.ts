import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentComponent } from './payment/payment.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  {path:'',redirectTo:'user-management',pathMatch:'full'},
  { path: '', component: DashboardComponent, children: [
    {path:'user-management',component:UserManagementComponent},
  {path:'dashboard',component:HomeComponent,
},
  {path:'project-management',component:ProjectManagementComponent},
  {path:'payment',component:PaymentComponent},
  {path:'invoice',component:InvoiceComponent},
 ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
