import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMangementComponent } from '../user-mangement/user-mangement.component';

const routes: Routes = [
 { path: 'dashboard/userManagement', component:UserMangementComponent},
 ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})

export class DashboardRoutingModule { }
